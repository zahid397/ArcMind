from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat_endpoint(data: ChatRequest):
    return {
        "response": f"Live AI response for: {data.message}"
    }
