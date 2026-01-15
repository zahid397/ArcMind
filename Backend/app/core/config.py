import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "ArcMind Agent")
    VERSION: str = "1.0.0"
    
    # AI Keys
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY")
    
    # Payment Keys
    CIRCLE_API_KEY: str = os.getenv("CIRCLE_API_KEY")

settings = Settings()
