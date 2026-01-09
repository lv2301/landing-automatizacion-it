# app/models/lead.py
from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime
from app.database import Base

class Lead(Base):
    """Tabla para guardar contactos del formulario."""
    __tablename__ = "leads"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    email = Column(String)
    phone = Column(String)
    mensaje = Column(String)
    fecha = Column(DateTime, default=datetime.utcnow)

class ChatSession(Base):
    __tablename__ = "chat_sessions"
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, unique=True, index=True)
    historial_completo = Column(Text)
    lead_info = Column(String, nullable=True) # Unificado
    fecha_inicio = Column(DateTime, default=datetime.utcnow)

class ChatHistory(Base):
    __tablename__ = "chat_history"
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, index=True)
    mensaje_usuario = Column(String)
    respuesta_bot = Column(String)
    fecha = Column(DateTime, default=datetime.utcnow)