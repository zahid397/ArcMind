from datetime import datetime, timedelta
import uuid
from typing import Dict, Optional
from app.models.schemas import SessionData

class MemoryStorage:
    def __init__(self):
        self.sessions: Dict[str, SessionData] = {}
        self.cleanup_interval = timedelta(hours=1)
    
    def create_session(self, question: str, preview: str, full_answer: str, price_usdc: float) -> str:
        session_id = str(uuid.uuid4())
        session_data = SessionData(
            session_id=session_id,
            question=question,
            preview=preview,
            full_answer=full_answer,
            price_usdc=price_usdc,
            paid=False,
            created_at=datetime.now()
        )
        self.sessions[session_id] = session_data
        return session_id
    
    def get_session(self, session_id: str) -> Optional[SessionData]:
        return self.sessions.get(session_id)
    
    def mark_as_paid(self, session_id: str) -> bool:
        if session_id in self.sessions:
            self.sessions[session_id].paid = True
            self.sessions[session_id].paid_at = datetime.now()
            return True
        return False
    
    def cleanup_old_sessions(self):
        cutoff = datetime.now() - timedelta(hours=24)
        self.sessions = {
            sid: data for sid, data in self.sessions.items()
            if data.created_at > cutoff
        }

storage = MemoryStorage()
