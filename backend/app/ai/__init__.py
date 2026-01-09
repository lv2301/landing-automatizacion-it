from .chat import get_ai_response

async def get_chatbot_response(message: str, history: list = []):
    """
    Función puente que llama al motor de chat asíncrono.
    """
    return await get_ai_response(message, history)