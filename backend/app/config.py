import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Luciano Valinoti - Automation API"
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY")
    DATABASE_URL: str = "sqlite:///./app/proyectos.db"
    PORT: int = 8001
    
    # Configuración de Email
    MAIL_USERNAME: str = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD: str = os.getenv("MAIL_PASSWORD")
    MAIL_FROM: str = os.getenv("MAIL_USERNAME")
    MAIL_PORT: int = 587
    MAIL_SERVER: str = "smtp.gmail.com"
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False

settings = Settings()