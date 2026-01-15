from pydantic import BaseModel, Field
from typing import Optional, Literal

# --- Transaction Model ---
class TransactionDetails(BaseModel):
    amount: str = Field(..., description="Amount paid in USDC")
    currency: str = Field(default="USDC")
    tx_hash: str = Field(..., description="Blockchain Transaction Hash")
    explorer_url: str = Field(..., description="Link to Arc Block Explorer")

# --- Request Model ---
class AgentRequest(BaseModel):
    task: str = Field(..., description="User task input")
    model_preference: Optional[Literal["groq", "gemini"]] = "groq"

# --- Response Model ---
class AgentResponse(BaseModel):
    status: str
    content: str
    reasoning: str
    tool_used: str
    image_url: Optional[str] = None
    transaction: TransactionDetails
    
