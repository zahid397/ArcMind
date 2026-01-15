from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    session_id: str
    preview: str
    price_usdc: float
    message: str = "Preview generated successfully"

class PaymentRequest(BaseModel):
    session_id: str
    payment_token: Optional[str] = "mock_payment_token"

class PaymentResponse(BaseModel):
    success: bool
    message: str
    session_id: str

class ResultResponse(BaseModel):
    session_id: str
    question: str
    preview: str
    full_answer: Optional[str] = None
    price_usdc: float
    paid: bool = False
    message: Optional[str] = None

class SessionData(BaseModel):
    session_id: str
    question: str
    preview: str
    full_answer: str
    price_usdc: float
    paid: bool = False
    created_at: datetime
    paid_at: Optional[datetime] = None
