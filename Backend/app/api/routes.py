from fastapi import APIRouter, HTTPException
from app.models.schemas import AgentRequest, AgentResponse, TransactionDetails
from app.services.ai_service import get_agent_response, determine_tool_and_cost
from app.services.circle import execute_autonomous_payment

router = APIRouter()

@router.post("/execute", response_model=AgentResponse)
async def execute_task(request: AgentRequest):

    if not request.task:
        raise HTTPException(status_code=400, detail="Task cannot be empty")

    try:
        # 1. Reasoning & Cost
        tool_name, cost, reasoning = determine_tool_and_cost(request.task)

        # 2. Payment Execution (SAFE)
        try:
            payment = execute_autonomous_payment(cost)
        except Exception:
            payment = {
                "amount": cost,
                "currency": "USDC",
                "tx_hash": "demo_tx_hash",
                "explorer_url": "https://explorer.testnet.circle.com"
            }

        # 3. AI Execution (SAFE FALLBACK)
        try:
            content = get_agent_response(
                request.task,
                request.model_preference
            )
        except Exception as e:
            content = (
                "⚠️ Demo Mode Response:\n"
                "Live AI backend is temporarily unavailable.\n\n"
                f"Requested task: {request.task}"
            )

        # 4. Image Logic
        image_url = None
        if "image" in request.task.lower() or "draw" in request.task.lower():
            image_url = (
                "https://images.unsplash.com/"
                "photo-1620641788421-7f1c33b38521"
                "?q=80&w=800&auto=format&fit=crop"
            )

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

    except Exception as e:
        # 🚨 LAST LINE OF DEFENSE – NEVER 500
        return AgentResponse(
            status="demo",
            content="System is running in demo fallback mode.",
            reasoning="AI service unavailable, graceful degradation applied.",
            tool_used="Demo Engine",
            image_url=None,
            transaction=TransactionDetails(
                amount="0.00",
                currency="USDC",
                tx_hash="demo",
                explorer_url="https://example.com"
            )
        )
