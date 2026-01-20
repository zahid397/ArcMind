# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import json
import random # Added random import here just in case

app = FastAPI(title="ArcMind Backend", version="1.0.0")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://arcmind.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    content: str
    role: str = "user"

class Product(BaseModel):
    id: str
    name: str
    price: float
    source: str
    profit_margin: Optional[float] = None

class Transaction(BaseModel):
    hash: str
    amount: float
    status: str

@app.get("/")
def read_root():
    return {"message": "ArcMind Autonomous Commerce API"}

@app.post("/api/chat")
async def chat(message: ChatMessage):
    responses = {
        "laptop": "Found 5 gaming laptops under $800. Best deal: ASUS TUF Gaming at $749 (18% ROI potential). Proceed?",
        "sneakers": "Tracking limited edition sneakers. Nike SB Dunk 'Chicago' available for $220, resell value ~$350.",
        "monitor": "GPU prices dropping! RTX 4070 Ti now at $699 (-15%). Recommend purchase for short-term flip.",
        "iphone": "iPhone 15 Pro 256GB selling for $950. Can resell for $1100. 15.8% profit margin achievable."
    }
    
    content_lower = message.content.lower()
    response_text = "I'll search for profitable deals based on your request and suggest the best action."
    
    for keyword, resp in responses.items():
        if keyword in content_lower:
            response_text = resp
            break
    
    transaction = Transaction(
        hash=f"0x{random.getrandbits(256):064x}",
        amount=random.randint(500, 1200),
        status="pending"
    )
    
    return {
        "response": response_text, # Changed key to match standard API response
        "transaction": transaction,
        "suggestions": [
            {"action": "purchase", "confidence": 0.85},
            {"action": "monitor", "confidence": 0.67}
        ]
    }

@app.get("/api/products")
async def get_products():
    products = [
        Product(id="1", name="NVIDIA RTX 4080", price=799.99, source="Newegg", profit_margin=0.22),
        Product(id="2", name="iPhone 15 Pro", price=899.99, source="Swappa", profit_margin=0.18),
        Product(id="3", name="Air Jordan 1 Lost & Found", price=240.00, source="StockX", profit_margin=0.32),
        Product(id="4", name="MacBook Air M2", price=849.99, source="Facebook Marketplace", profit_margin=0.15),
    ]
    return products

@app.get("/api/treasury")
async def get_treasury():
    return {
        "balance": 2500.75,
        "currency": "USDC",
        "network": "Arc Mainnet",
        "daily_profit": 124.50,
        "active_deals": 3
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    
