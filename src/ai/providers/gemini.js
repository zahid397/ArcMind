/**
 * Gemini Provider - FLASH EDITION ⚡
 * Model: gemini-3-flash
 * Implementation: Native Fetch (No SDK needed)
 */

export const geminiAI = {
  async generate(prompt) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("Gemini API Key missing");
      return "Gemini Key Missing. Switched to simulation.";
    }

    try {
      const MODEL = "gemini-3-flash"; 
      const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          system_instruction: {
            parts: [{ text: "You are Payperinsight. Be concise and professional." }]
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const insight = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!insight) throw new Error("Empty response from Gemini.");

      return insight;

    } catch (error) {
      console.error("Gemini Provider Failed:", error);
      throw error; 
    }
  }
};
