from typing import Tuple
from app.services.ai import AIService
from app.agent.pricing import pricing_engine

class QueryAnalyzer:
    def __init__(self):
        self.ai_service = AIService()
    
    async def process_query(self, question: str) -> Tuple[str, str, float]:
        """Process query and return preview, full answer, and price"""
        
        # Validate question
        if not question or len(question.strip()) < 3:
            raise ValueError("Question must be at least 3 characters")
        
        if len(question) > 1000:
            question = question[:1000] + "..."
        
        # Generate AI response
        preview, full_answer = await self.ai_service.generate_insight(question)
        
        # Calculate price
        price = pricing_engine.calculate_price(question, preview)
        
        return preview, full_answer, price

analyzer = QueryAnalyzer()
