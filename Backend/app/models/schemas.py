from pydantic import BaseModel
from typing import Optional

# ইনপুট
class AskRequest(BaseModel):
    question: str
    model: Optional[str] = "groq" # user can choose: groq, deepseek, gemini

# আউটপুট
class AskResponse(BaseModel):
    model_used: str
    preview: str
    full_answer_hidden: str
    price_usdc: float
    status: str
  
