/**
 * OpenAI Provider - OPTIMIZED FOR REASONING
 * Model: gpt-4o
 * Implementation: Native Fetch (No SDK needed)
 */

export const openaiAI = {
  async generate(prompt) {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    // 1. Safety Check
    if (!apiKey) {
      console.warn("OpenAI API Key missing");
      return "OpenAI Key Missing. Switched to simulation.";
    }

    try {
      // 2. Direct API Call
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are Payperinsight, an enterprise AI assistant. Be concise, logical, and accurate."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
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
      throw error; 
    }
  }
};
