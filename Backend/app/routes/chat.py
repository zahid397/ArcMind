from fastapi import APIRouter, HTTPException
from app.models.schemas import ChatRequest, ChatResponse
from app.agent.analyzer import analyzer
from app.agent.policy import policy_engine
from app.storage.memory import storage
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Process user question and return preview with price"""
    
    try:
        # Validate question
        if not policy_engine.validate_question(request.question):
            raise HTTPException(status_code=400, detail="Question violates content policy")
        
        # Process query
        preview, full_answer, price = await analyzer.process_query(request.question)
        
        # Sanitize responses
        preview = policy_engine.sanitize_response(preview)
        full_answer = policy_engine.sanitize_response(full_answer)
        
        # Store session
        session_id = storage.create_session(
            question=request.question,
            preview=preview,
            full_answer=full_answer,
            price_usdc=price
        )
        
        logger.info(f"Created session {session_id} for question: {request.question[:50]}...")
        
        return ChatResponse(
            session_id=session_id,
            preview=preview,
            price_usdc=price,
            message="Preview generated. Pay to unlock full insight."
        )
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error processing chat: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
