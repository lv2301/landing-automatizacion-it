# app/ai/chat.py
import os
from groq import Groq
from app.ai.prompts import SYSTEM_PROMPT

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

async def get_chatbot_response(user_message: str, history: list = []):
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    
    # Mantener memoria de los últimos 6 mensajes
    if history:
        messages.extend(history[-6:])
    
    messages.append({"role": "user", "content": user_message})

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            temperature=0.6,
            max_tokens=250
        )
        return completion.choices[0].message.content
    except Exception as e:
        print(f"Error en Groq: {e}")
        return "ERROR_TECNICO"