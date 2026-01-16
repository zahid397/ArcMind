# 🧠 ArcMind: Autonomous Agentic Commerce
**“One Task. One Payment. Infinite Possibilities.”**

Next.js · FastAPI · Groq · Circle · Arc

---

## 🚀 Overview
ArcMind is an autonomous AI agent built for the **Agentic Commerce on Arc Hackathon**.  
Unlike traditional chatbots, ArcMind doesn’t just respond — it **acts, decides cost, and pays**.

The agent autonomously analyzes user tasks, calculates the required budget, and executes **USDC micropayments on the Arc Network** to fetch premium data (weather, prices) or generate high-fidelity content (images).

---

## 🌟 Key Features
- **🤖 Autonomous AI Agent** — Decides tools, cost, and execution flow
- **💸 USDC Micropayments** — Payments executed via Circle infrastructure on Arc Testnet
- **🧠 Transparent Reasoning** — Shows why a tool/payment was chosen
- **⚡ Fast Inference** — Groq (Mixtral) for low-latency reasoning
- **🎨 Modern UI** — Cyberpunk-inspired interface with smooth UX
- **🔗 Onchain Settlement** — Payments verified via Arc network



### 🏗️ Architecture
The system consists of a high-performance FastAPI Backend and a reactive Next.js Frontend.

```mermaid
graph LR
    A[User] --> B[Frontend UI]
    B --> C[FastAPI Backend]
    C --> D[AI Agent Logic]
    D --> E[Groq LLM]
    C --> F[Payment Service]
    F --> G[Arc Network]
    G --> C
    C --> B
🛠️ Tech Stack
Frontend
Framework: Next.js 14 (App Router)
Styling: Tailwind CSS, Framer Motion
Icons: Lucide React
State: React Hooks
Backend
API: FastAPI (Python)
AI Models: Groq (Mixtral-8x7b), Google Gemini Pro
Validation: Pydantic
Server: Uvicorn
Blockchain & Payments
Network: Arc Testnet
Currency: USDC
Payments: Circle Gateway (mocked for demo)
Installation & Setup
1️⃣ Backend Setup
cd arcmind-backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
.env
GROQ_API_KEY=your_groq_key
GEMINI_API_KEY=your_gemini_key
CIRCLE_API_KEY=your_circle_key
PROJECT_NAME=ArcMind
Run:
uvicorn app.main:app --reload
Backend runs at:
👉 http://localhost:8000
2️⃣ Frontend Setup
cd arcmind-frontend
npm install
Create .env.local:

NEXT_PUBLIC_API_URL=http://localhost:8000/api/agent/execute
Run:
npm run dev
Frontend runs at:
👉 http://localhost:3000
📸 Demo Scenarios
“Generate a cyberpunk city image”
→ Image Tool → Pays 0.020 USDC → Image generated
“What is the current weather in Dhaka?”
→ Weather API → Pays 0.005 USDC → Data fetched
“Check Bitcoin price”
→ Oracle Feed → Pays 0.002 USDC → Price returned
📂 API Documentation
Swagger UI available at:
👉 http://localhost:8000/docs
Endpoint
POST /api/agent/execute
Request

{
  "task": "Draw a sunset",
  "model_preference": "groq"
}
Response
{
  "status": "success",
  "content": "Here is the generated image...",
  "reasoning": "Image generation requires GPU compute",
  "transaction": {
    "amount": "0.020",
    "currency": "USDC",
    "tx_hash": "0xabc123",
    "network": "Arc Testnet"
  }
}
👥 Contributors
Zahid Hasan — Lead Developer
📜 License
MIT License — see LICENSE for details.
