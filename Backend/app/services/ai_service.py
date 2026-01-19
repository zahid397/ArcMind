import os
from groq import Groq
from app.core.config import settings

# Initialize Groq Client
try:
    groq_client = Groq(api_key=settings.GROQ_API_KEY)
except Exception as e:
    print("❌ Groq init failed:", e)
    groq_client = None


def determine_tool_and_cost(task: str):
    task_lower = task.lower()

    if "weather" in task_lower:
        return "OpenWeather API (Premium)", "0.005", "Real-time meteorological data requested."
    elif "image" in task_lower or "draw" in task_lower:
        return "Image Generator (Simulated)", "0.020", "GPU compute allocated for image generation."
    elif "price" in task_lower or "btc" in task_lower:
        return "Chainlink Oracle", "0.002", "Decentralized price feed queried."
    elif "code" in task_lower or "audit" in task_lower:
        return "DeepSeek Coder (Simulated)", "0.015", "Static analysis reasoning."
    else:
        return "Groq LLM Inference", "0.001", "Natural language reasoning task."


def get_agent_response(task: str, model_type: str = "groq"):
    system_prompt = f"""
You are ArcMind, an autonomous AI agent.
Answer concisely and professionally.

Task:
{task}
"""

    # ---- GROQ ONLY (STABLE) ----
    if groq_client:
        try:
            completion = groq_client.chat.completions.create(
                model="llama3-70b-8192",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": task}
                ],
                temperature=0.6
            )
            return completion.choices[0].message.content
        except Exception as e:
            print("❌ Groq failed:", e)

    # ---- FINAL FALLBACK (DEMO MODE) ----
    return (
        "⚠️ Demo Mode Response:\n"
        "The AI backend is temporarily unavailable.\n"
        "In live mode, ArcMind would generate a full intelligent response here."
    )
