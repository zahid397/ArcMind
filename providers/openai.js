/**
 * OpenAI Provider - OPTIMIZED FOR REASONING & LOGIC
 * Model: gpt-4o (The Omnimodel)
 * Role: Handles complex queries, code refactoring, and deep analysis.
 * Implementation: Native Fetch (Zero Dependency)
 */

export const openaiAI = {
  async generate(prompt) {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    // 1. Safety Check
    if (!apiKey) {
      console.warn("OpenAI API Key missing");
      throw new Error("OpenAI Config Error");
    }

    try {
      // 2. Direct API Call to GPT-4o
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o", // Most capable model for reasoning
          messages: [
            {
              role: "system",
              content: "You are Payperinsight, a premium enterprise AI assistant. Your responses must be structured, logical, and highly accurate. Avoid fluff. Use markdown for clarity."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,      // Balanced creativity
          max_tokens: 1500,      // Allow enough space for detailed reasoning
          top_p: 1
        })
      });

      // 3. Error Handling
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(`OpenAI API Error: ${errData.error?.message || response.statusText}`);
      }

      // 4. Parse Response
      const data = await response.json();
      return data.choices[0]?.message?.content || "No insight generated.";

    } catch (error) {
      console.error("OpenAI Provider Failed:", error);
      throw error; // Engine catches this -> switches to Mock
    }
  }
};
