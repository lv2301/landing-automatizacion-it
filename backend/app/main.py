# app/main.py
"""
Backend principal con:
- Memoria conversacional (recuerda toda la conversación)
- Detección automática de leads (teléfono/email)
- Notificaciones mejoradas por email y Telegram
"""

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uvicorn
import json
import uuid
from datetime import datetime

from app.database import engine, Base, get_db
from app.models.lead import ChatHistory, ChatSession
from app.ai import get_chatbot_response 
from app.api.v1.contact import router as contact_router
from app.schemas import ChatQuery
from app.utils.lead_detector import detector

# Crear tablas en la base de datos
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Luciano Valinoti - Automatización IT",
    description="Backend con IA conversacional y detección de leads",
    version="2.1.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas de contacto
app.include_router(contact_router, prefix="/api/v1")

# ============================================
# FUNCIONES AUXILIARES
# ============================================

def obtener_historial(session_id: str, db: Session) -> list:
    """Recupera el historial completo de una conversación"""
    sesion = db.query(ChatSession).filter(
        ChatSession.session_id == session_id
    ).first()
    
    if sesion and sesion.historial_completo:
        try:
            return json.loads(sesion.historial_completo)
        except:
            return []
    return []

def guardar_historial(session_id: str, historial: list, db: Session, lead_info: str = None):
    """Guarda el historial actualizado de la conversación"""
    sesion = db.query(ChatSession).filter(
        ChatSession.session_id == session_id
    ).first()
    
    if not sesion:
        # Crear nueva sesión
        sesion = ChatSession(
            session_id=session_id,
            historial_completo=json.dumps(historial, ensure_ascii=False),
            lead_detectado=lead_info
        )
        db.add(sesion)
    else:
        # Actualizar sesión existente
        sesion.historial_completo = json.dumps(historial, ensure_ascii=False)
        sesion.fecha_ultima_interaccion = datetime.utcnow()
        if lead_info:
            sesion.lead_detectado = lead_info
    
    db.commit()

# ============================================
# ENDPOINT PRINCIPAL DEL CHATBOT
# ============================================

@app.post("/api/chat")
async def chat_endpoint(query: ChatQuery, db: Session = Depends(get_db)):
    """
    Endpoint del chatbot con:
    - Memoria conversacional
    - Detección automática de leads
    - Notificaciones mejoradas
    """
    try:
        # 1. GESTIÓN DE SESIÓN
        # Si el frontend no envía session_id, crear uno nuevo
        session_id = query.session_id or str(uuid.uuid4())
        
        # Recuperar historial previo de esta conversación
        historial = obtener_historial(session_id, db)
        
        # 2. DETECCIÓN DE LEAD
        analisis = detector.analizar(query.message)
        
        # Si es un lead, mostrar en consola
        if analisis['es_lead']:
            print(f"🎯 [LEAD DETECTADO] {analisis['razon']}")
        
        # 3. OBTENER RESPUESTA DE LA IA (con todo el contexto)
        respuesta = await get_chatbot_response(query.message, historial)
        
        # Manejo de error técnico
        if respuesta == "ERROR_TECNICO":
            return {
                "response": "Mi asistente automático está con demoras técnicas. Contactame directamente por WhatsApp al +54 351 688 9414.",
                "session_id": session_id
            }
        
        # 4. ACTUALIZAR HISTORIAL
        historial.append({"role": "user", "content": query.message})
        historial.append({"role": "assistant", "content": respuesta})
        
        # 5. GUARDAR EN BASE DE DATOS
        try:
            # Guardar interacción individual
            nuevo_chat = ChatHistory(
                session_id=session_id,
                mensaje_usuario=query.message, 
                respuesta_bot=respuesta
            )
            db.add(nuevo_chat)
            
            # Guardar historial completo
            lead_info = None
            if analisis['es_lead']:
                # Guardar teléfono o email detectado
                lead_info = f"{analisis['telefono'] or ''} {analisis['email'] or ''}".strip()
            
            guardar_historial(session_id, historial, db, lead_info)
            db.commit()
            
        except Exception as db_err:
            print(f"[ERROR DB]: {db_err}")
        
        # 6. RETORNAR RESPUESTA
        return {
            "response": respuesta,
            "session_id": session_id,
            "lead_detected": analisis['es_lead']  # Info para el frontend
        }

    except Exception as e:
        print(f"[ERROR ENDPOINT]: {e}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")

# ============================================
# ENDPOINT DE SALUD (para verificar que funciona)
# ============================================

@app.get("/api/health")
async def health_check():
    """Verifica que el servidor esté funcionando"""
    return {
        "status": "ok", 
        "version": "2.1.0",
        "features": ["memoria_conversacional", "deteccion_leads"]
    }

# ============================================
# EJECUCIÓN
# ============================================

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8001, reload=True)