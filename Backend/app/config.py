import os
from typing import Optional
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Groq
    groq_api_key: str = os.getenv("GROQ_API_KEY", "")
    groq_model: str = os.getenv("GROQ_MODEL", "llama3-70b-8192")
    
    # Arc
    arc_rpc_url: str = os.getenv("ARC_RPC_URL", "https://rpc.testnet.arc.network")
    
    # Circle (mock for demo)
    circle_api_key: str = os.getenv("CIRCLE_API_KEY", "mock")
    circle_wallet_id: str = os.getenv("CIRCLE_WALLET_ID", "mock")
    
    # Session
    session_secret: str = os.getenv("SESSION_SECRET", "dev-secret")
    
    # Frontend
    frontend_url: str = os.getenv("FRONTEND_URL", "http://localhost:3000")
    
    # Server
    port: int = int(os.getenv("PORT", 8000))
    
    class Config:
        env_file = ".env"

settings = Settings()
