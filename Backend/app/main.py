from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import time
import random

app = FastAPI(title="ArcMind AI Agent", version="1.0")

# 1. CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Hackathon-friendly
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Input Model
class AgentRequest(BaseModel):
    prompt: str

# 3. Dummy Product Database
products_db = {
    "iphone": {"price": 999, "name": "iPhone 15 Pro", "stock": "In Stock"},
    "macbook": {"price": 1299, "name": "MacBook Air M2", "stock": "In Stock"},
    "coffee": {"price": 5, "name": "Starbucks Latte", "stock": "Low Stock"},
    "shoe": {"price": 120, "name": "Nike Air Jordan", "stock": "In Stock"},
}

# 4. Smart Mock AI Logic
def get_mock_ai_response(prompt: str):
    prompt = prompt.lower()

    if any(word in prompt for word in ["price", "cost", "buy", "find"]):
        for key, product in products_db.items():
            if key in prompt:
                return (
                    f"🔍 Found deal: **{product['name']}** is available for "
                    f"**${product['price']} USDC**. Status: {product['stock']}. "
                    "Shall I verify the transaction?"
                )
        return "🤔 I couldn't find that item. Try searching for iPhone, MacBook, or Shoes."

    elif any(word in prompt for word in ["balance", "wallet", "money"]):
        return "💰 Your Circle Wallet balance is **$2,450.50 USDC**. Recent spending: $45 on Amazon."

    elif any(word in prompt for word in ["hello", "hi", "hey"]):
        return "👋 Hey! I’m your autonomous AI commerce agent. What would you like me to find or buy?"

    else:
        return random.choice([
            "🤖 Processing your request… could you specify the product name?",
            "⚙️ Analyzing market trends. Please clarify your intent.",
            "📡 Connected to Circle payment network. Awaiting next command."
        ])

# 5. Main Agent Endpoint
@app.post("/agent/command")
async def run_agent(request: AgentRequest):
    print(f"[Agent] User prompt: {request.prompt}")

    # Simulate AI thinking
    await asyncio.sleep(1.5)

    ai_response = get_mock_ai_response(request.prompt)

    return {
        "status": "completed",
        "message": ai_response,
        "timestamp": time.time()
    }

# 6. Health Check (Judge-friendly)
@app.get("/")
def health():
    return {
        "status": "online",
        "agent": "ArcMind AI",
        "mode": "mock-demo"
    }

# Run: uvicorn main:app --reload
