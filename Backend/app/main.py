from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import routes

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    docs_url="/docs"
)

# CORS Setup (Allow Frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Hackathon-এর জন্য সব ওপেন
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect Routes
app.include_router(routes.router, prefix="/api/agent", tags=["Autonomous Agent"])

@app.get("/")
def health_check():
    return {"status": "online", "system": "ArcMind Brain 🧠"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
    
