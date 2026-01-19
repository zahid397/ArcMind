from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import time

# আমরা নিজের ফোল্ডার থেকে ইম্পোর্ট করছি
from app.models import AgentRequest
from app.engine import get_mock_ai_response

app = FastAPI(title="ArcMind AI Agent", version="1.0")

# 1. CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Main Agent Endpoint
@app.post("/agent/command")
async def run_agent(request: AgentRequest):
    print(f"[Agent] User prompt: {request.prompt}")

    # Simulate AI thinking (তোমার দেওয়া কোড)
    await asyncio.sleep(1.5)

    ai_response = get_mock_ai_response(request.prompt)

    return {
        "status": "completed",
        "message": ai_response,
        "timestamp": time.time()
    }

# 3. Health Check
@app.get("/")
def health():
    return {
        "status": "online",
        "agent": "ArcMind AI",
        "mode": "mock-demo"
    }
  
