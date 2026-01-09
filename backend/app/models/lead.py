# app/models/lead.py
"""
Modelos de base de datos.
CAMBIO: Agregamos ChatSession para guardar conversaciones completas.
"""

from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime
from app.database import Base

class Lead(Base):
    """Tabla para guardar contactos del formulario (sin cambios)"""
    __tablename__ = "leads"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    email = Column(String)
    phone = Column(String)
    mensaje = Column(String)
    fecha = Column(DateTime, default=datetime.utcnow)

class ChatHistory(Base):
    """
    Tabla para guardar cada mensaje individual del chat.
    CAMBIO: Agregamos session_id para agrupar conversaciones.
    """
    __tablename__ = "chat_history"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, index=True)  # Para agrupar mensajes de una conversación
    mensaje_usuario = Column(String)
    respuesta_bot = Column(String)
    fecha = Column(DateTime, default=datetime.utcnow)

class ChatSession(Base):
    """
    NUEVO: Tabla para guardar conversaciones completas.
    Esto permite que el bot "recuerde" toda la conversación.
    """
    __tablename__ = "chat_sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, unique=True, index=True)  # ID único de la conversación
    historial_completo = Column(Text)  # Todo el chat en formato JSON
    lead_detectado = Column(String, nullable=True)  # WhatsApp/Email si se detectó
    fecha_inicio = Column(DateTime, default=datetime.utcnow)
    fecha_ultima_interaccion = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)