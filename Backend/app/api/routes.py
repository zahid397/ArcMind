from fastapi import APIRouter, HTTPException
from app.models.schemas import AgentRequest, AgentResponse, TransactionDetails
from app.services.ai_service import get_agent_response, determine_tool_and_cost
from app.services.circle import execute_autonomous_payment

router = APIRouter()

@router.post("/execute", response_model=AgentResponse)
async def execute_task(request: AgentRequest):
    if not request.task:
        raise HTTPException(status_code=400, detail="Task cannot be empty")

    # 1. Reasoning & Cost
    tool_name, cost, reasoning = determine_tool_and_cost(request.task)
    
    # 2. Payment Execution
    payment = execute_autonomous_payment(cost)
    
    # 3. AI Execution
    content = get_agent_response(request.task, request.model_preference)
    
    # 4. Image Logic (Demo URL)
    image_url = None
    if "image" in request.task.lower() or "draw" in request.task.lower():
        image_url = "https://images.unsplash.com/photo-1620641788421-7f1c33b38521?q=80&w=800&auto=format&fit=crop"

    return AgentResponse(
        status="success",
        content=content,
        reasoning=reasoning,
        tool_used=tool_name,
        image_url=image_url,
        transaction=TransactionDetails(
            amount=payment["amount"],
            currency=payment["currency"],
            tx_hash=payment["tx_hash"],
            explorer_url=payment["explorer_url"]
        )
    )
    
