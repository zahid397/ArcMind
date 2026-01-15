from fastapi import APIRouter, HTTPException
from app.models.schemas import AskRequest, AskResponse
from app.services.ai import generate_insight

router = APIRouter()

@router.post("/ask", response_model=AskResponse)
async def ask_agent(request: AskRequest):
    """
    Get insight using Groq (default), Gemini, or DeepSeek.
    Payload: {"question": "Should I buy BTC?", "model": "groq"}
    """
    if not request.question:
        raise HTTPException(status_code=400, detail="Question empty")

    # AI Service Call
    data = generate_insight(request.question, request.model)
    return data
  
