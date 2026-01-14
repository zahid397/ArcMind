Payperinsight AI 🧠
Enterprise Intelligence · Pay-Per-Insight AI Platform
Payperinsight is a modern AI chat interface designed for enterprise-grade analysis, decision support, and high-quality insights.
The platform intelligently routes queries across multiple AI engines while enforcing a usage-based access model.
This project is built as a production prototype — not a toy demo.
✨ Key Features
🧠 Hybrid AI Engine
Smart routing between Groq, Gemini, OpenAI
Automatic fallback to Stealth Mock AI for demos
💎 Glassmorphism UI
Dark-mode first
Smooth animations
Premium enterprise look & feel
⚡ Real-Time Chat Experience
Typing indicator
Auto-scrolling chat
Sticky input bar
🎟️ Usage-Based Access
First 5 queries free
After limit → Paywall modal
No real payment (UI simulation only)
🛡️ Safe by Design
No API key → no crash
Mock AI ensures demos always work
Environment variables fully protected
🛠️ Tech Stack
Layer
Technology
Frontend
React 18 + Vite
Styling
CSS3 (Glassmorphism, Dark UI)
State
React Hooks + LocalStorage
AI Providers
Groq · Gemini · OpenAI · Mock
Build
Vite
Deploy
Netlify · Vercel · Static Hosting
📁 Project Strupayperinsight/
├── index.html
├── package.json
├── vite.config.js
├── .env
├── public/
│   └── logo.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles/
    │   └── main.css
    ├── components/
    │   ├── Chat/
    │   ├── Paywall/
    │   └── UI/
    ├── ai/
    │   ├── engine.js
    │   ├── router.js
    │   ├── mockAI.js
    │   └── providers/
    ├── store/
    │   └── usageStore.js
    └── utils/
        └── helpers.jscture
        
⚙️ Environment Variables
Create a .env file in the root:
VITE_GROQ_API_KEY=
VITE_GEMINI_API_KEY=
VITE_OPENAI_API_KEY=
🚀 Getting Started
1️⃣ Install Dependencies
npm install
2️⃣ Run Development Server
npm run dev
3️⃣ Build for Production
npm run build
🧪 Demo & Evaluation Notes (For Judges)
The AI engine dynamically selects providers based on prompt complexity
Mock AI simulates realistic enterprise responses
Paywall is intentionally UI-only (prototype focus)
Architecture is scalable for backend/API expansion
🔮 Future Roadmap
Backend API gateway
Real payment integration (Circle / Stripe)
User authentication
Usage analytics dashboard
Model-specific cost optimization
👤 Author
Zahid Hasan
AI / Full-Stack Engineer
Built for AI Hackathons & Enterprise Prototypes
