from fastapi import APIRouter, HTTPException
from app.models.schemas import AgentRequest
from app.api.routes import execute_task

router = APIRouter()

@router.post("/chat")
async def chat_adapter(request: dict):
    message = request.get("message")

    if not message:
        raise HTTPException(status_code=400, detail="Message is required")

    agent_request = AgentRequest(
        task=message,
        model_preference="deepseek"
    )

    return await execute_task(agent_request)
