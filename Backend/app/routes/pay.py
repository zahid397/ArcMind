from fastapi import APIRouter, HTTPException
from app.models.schemas import PaymentRequest, PaymentResponse
from app.services.payment import payment_service
from app.services.arc import arc_service
from app.storage.memory import storage
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/pay", response_model=PaymentResponse)
async def pay_endpoint(request: PaymentRequest):
    """Process payment for a session"""
    
    try:
        # Get session
        session = storage.get_session(request.session_id)
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        if session.paid:
            return PaymentResponse(
                success=True,
                message="Already paid",
                session_id=request.session_id
            )
        
        # Process payment
        payment_success = await payment_service.process_payment(
            session_id=request.session_id,
            amount_usdc=session.price_usdc
        )
        
        if not payment_success:
            raise HTTPException(status_code=402, detail="Payment failed")
        
        # Verify settlement on Arc
        settlement_verified = await arc_service.verify_settlement(request.payment_token)
        
        if not settlement_verified:
            raise HTTPException(status_code=402, detail="Settlement verification failed")
        
        # Mark as paid
        storage.mark_as_paid(request.session_id)
        
        logger.info(f"Payment processed for session {request.session_id}")
        
        return PaymentResponse(
            success=True,
            message=f"Payment of {session.price_usdc} USDC successful!",
            session_id=request.session_id
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing payment: {str(e)}")
        raise HTTPException(status_code=500, detail="Payment processing error")
