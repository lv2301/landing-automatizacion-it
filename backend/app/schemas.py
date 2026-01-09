# app/schemas.py
"""
Esquemas de validación de datos.
CAMBIO: Agregamos session_id opcional al ChatQuery.
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class ChatQuery(BaseModel):
    """
    Datos que envía el frontend cuando el usuario manda un mensaje.
    NUEVO: session_id para mantener la conversación.
    """
    message: str = Field(..., min_length=1, max_length=1000)
    session_id: Optional[str] = None  # El frontend lo guarda y lo envía

class ContactForm(BaseModel):
    """Formulario de contacto (sin cambios)"""
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=8, max_length=20)
    message: str = Field(..., min_length=5, max_length=2000)