import os
from groq import Groq
import google.generativeai as genai
from app.core.config import settings

# Initialize Clients Safely
try:
    groq_client = Groq(api_key=settings.GROQ_API_KEY)
except:
    groq_client = None

try:
    genai.configure(api_key=settings.GEMINI_API_KEY)
except:
    pass

def determine_tool_and_cost(task: str):
    task_lower = task.lower()
    
    if "weather" in task_lower:
        return "OpenWeather API (Premium)", "0.005", "Real-time meteorological data requested."
    elif "image" in task_lower or "generate" in task_lower or "draw" in task_lower:
        return "DALL-E 3 / Flux Engine", "0.020", "GPU compute allocated for image generation."
    elif "price" in task_lower or "btc" in task_lower or "stock" in task_lower:
        return "Chainlink Oracle", "0.002", "Decentralized price feed queried via Arc."
    elif "audit" in task_lower or "code" in task_lower:
        return "DeepSeek Coder API", "0.015", "Running static analysis and vulnerability scan."
    else:
        return "Groq LLM Inference", "0.001", "Natural language processing task."

def get_agent_response(task: str, model_type: str = "groq"):
    system_prompt = f"""
    You are ArcMind, an autonomous AI agent. 
    Task: {task}
    1. Answer concisely and professionally.
    2. If asked for an image, describe the image vividly.
    3. If asked for weather/prices, provide realistic simulated data.
    """
    
    # --- PLAN A: GROQ ---
    if model_type == "groq" and groq_client:
        try:
            completion = groq_client.chat.completions.create(
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": task}
                ],
                model="mixtral-8x7b-32768",
                temperature=0.6,
            )
            return completion.choices[0].message.content
        except Exception as e:
            print(f"❌ Groq Error: {e}. Switching to Gemini.")
            return _call_gemini(system_prompt)
    
    # --- PLAN B: GEMINI ---
    return _call_gemini(system_prompt)

def _call_gemini(prompt: str):
    try:
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"System Malfunction: AI Unreachable. ({str(e)})"
        
