import random

# Dummy Product Database
products_db = {
    "iphone": {"price": 999, "name": "iPhone 15 Pro", "stock": "In Stock"},
    "macbook": {"price": 1299, "name": "MacBook Air M2", "stock": "In Stock"},
    "coffee": {"price": 5, "name": "Starbucks Latte", "stock": "Low Stock"},
    "shoe": {"price": 120, "name": "Nike Air Jordan", "stock": "In Stock"},
}

# Smart Mock AI Logic
def get_mock_ai_response(prompt: str):
    prompt = prompt.lower()

    if any(word in prompt for word in ["price", "cost", "buy", "find"]):
        for key, product in products_db.items():
            if key in prompt:
                return (
                    f"🔍 Found deal: **{product['name']}** is available for "
                    f"**${product['price']} USDC**. Status: {product['stock']}. "
                    "Shall I verify the transaction?"
                )
        return "🤔 I couldn't find that item. Try searching for iPhone, MacBook, or Shoes."

    elif any(word in prompt for word in ["balance", "wallet", "money"]):
        return "💰 Your Circle Wallet balance is **$2,450.50 USDC**. Recent spending: $45 on Amazon."

    elif any(word in prompt for word in ["hello", "hi", "hey"]):
        return "👋 Hey! I’m your autonomous AI commerce agent. What would you like me to find or buy?"

    else:
        return random.choice([
            "🤖 Processing your request… could you specify the product name?",
            "⚙️ Analyzing market trends. Please clarify your intent.",
            "📡 Connected to Circle payment network. Awaiting next command."
        ])
      
