# app/ai/chat.py
"""
Comunicación con Groq (IA).
CAMBIO: Ahora SÍ usa el historial para mantener contexto.
"""

import os
from groq import Groq
from app.ai.prompts import SYSTEM_PROMPT

# Inicializar cliente de Groq
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("Falta GROQ_API_KEY en el .env")

client = Groq(api_key=api_key)

async def get_ai_response(user_message: str, history: list = []):
    """
    Llama a Groq con el mensaje del usuario Y todo el historial previo.
    
    Args:
        user_message: Lo que el usuario acaba de escribir
        history: Lista de mensajes anteriores [{"role": "user", "content": "..."}, ...]
    
    Returns:
        str: Respuesta del bot o "ERROR_TECNICO" si falla
    """
    
    # Construir lista de mensajes para enviar a Groq
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    
    # Agregar historial previo (últimas 10 interacciones para no exceder tokens)
    if history:
        messages.extend(history[-10:])
    
    # Agregar mensaje actual
    messages.append({"role": "user", "content": user_message})

    try:
        # Llamar a Groq
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            temperature=0.7,    # Más natural
            max_tokens=100,     # Respuestas cortas (3-4 líneas máximo)
            top_p=0.9,
            stream=False,
        )
        
        respuesta = completion.choices[0].message.content
        
        # Log para debugging (comentá esta línea si no querés ver los tokens)
        print(f"[IA] Tokens usados: {completion.usage.total_tokens}")
        
        return respuesta

    except Exception as e:
        print(f"[ERROR IA]: {str(e)}")
        return "ERROR_TECNICO"