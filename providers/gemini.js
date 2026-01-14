/**
 * Gemini Provider - FLASH EDITION ⚡
 * Model: gemini-3-flash
 * Speed: Extreme | Cost: Low | Quality: High
 * Implementation: Native Fetch (No SDK needed)
 */

export const geminiAI = {
  async generate(prompt) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("Gemini API Key missing");
      throw new Error("Gemini Config Error");
    }

    try {
      // ✅ USING THE FASTEST MODEL: gemini-1.5-flash
      const MODEL = "gemini-1.5-flash"; 
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
          // Persona Injection
          system_instruction: {
            parts: [{ text: "You are Payperinsight, an elite enterprise AI. Be ultra-concise, data-driven, and ignore small talk. Use bullet points." }]
          },
          generationConfig: {
            temperature: 0.7,      // Creative but stable
            maxOutputTokens: 1000, // Short & crisp answers
          }
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(`Gemini API Error: ${errData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const insight = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!insight) throw new Error("Empty response from Gemini Flash.");

      return insight;

    } catch (error) {
      console.error("Gemini Flash Provider Failed:", error);
      throw error; 
    }
  }
};
