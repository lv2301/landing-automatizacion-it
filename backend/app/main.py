# app/main.py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import uvicorn, json, uuid, httpx
from app.database import engine, Base, get_db
from app.models.lead import ChatHistory, ChatSession
from app.ai.chat import get_chatbot_response 
from app.schemas import ChatQuery
from app.utils.lead_detector import detector

Base.metadata.create_all(bind=engine)
app = FastAPI()

N8N_WEBHOOK = "http://localhost:5678/rest/webhooks/lead-manager"

@app.post("/api/chat")
async def chat_endpoint(query: ChatQuery, db: Session = Depends(get_db)):
    session_id = query.session_id or str(uuid.uuid4())
    try:
        sesion = db.query(ChatSession).filter(ChatSession.session_id == session_id).first()
        historial = json.loads(sesion.historial_completo) if sesion else []

        # 1. Obtener respuesta de Luciano
        respuesta = await get_chatbot_response(query.message, historial)

        # 2. Analizar si el cliente ya está cerrando la cita
        analisis = detector.analizar(query.message)

        # 3. DISPARAR n8n (Si hay intención, n8n es quien debe agendar)
        if analisis['quiere_agendar']:
            async with httpx.AsyncClient() as client:
                try:
                    # n8n recibe esto y debería disparar tu Google Calendar / WhatsApp
                    await client.post(N8N_WEBHOOK, json={
                        "session_id": session_id,
                        "fecha_propuesta": query.message, 
                        "lead": analisis,
                        "historial_breve": historial[-2:] if historial else []
                    }, timeout=1.5)
                except: pass

        # 4. Guardar en DB
        nuevo_h = ChatHistory(session_id=session_id, mensaje_usuario=query.message, respuesta_bot=respuesta)
        db.add(nuevo_h)
        historial.append({"role": "user", "content": query.message})
        historial.append({"role": "assistant", "content": respuesta})
        
        if not sesion:
            sesion = ChatSession(session_id=session_id, historial_completo=json.dumps(historial))
            db.add(sesion)
        else:
            sesion.historial_completo = json.dumps(historial)
        db.commit()

        return {"response": respuesta, "session_id": session_id}

    except Exception as e:
        return {"response": "Luciano aquí. Error técnico. Escribime al +543516889414."}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8001)