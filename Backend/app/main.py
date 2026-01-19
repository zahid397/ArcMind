from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import routes, chat

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    docs_url="/docs"
)

# CORS (Hackathon friendly)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Existing agent routes
app.include_router(
    routes.router,
    prefix="/api/agent",
    tags=["Autonomous Agent"]
)

# 🔥 NEW: Frontend compatible chat route
app.include_router(
    chat.router,
    prefix="/api",
    tags=["Chat Adapter"]
)

@app.get("/")
def health_check():
    return {
        "status": "online",
        "system": "ArcMind Brain 🧠"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000)
