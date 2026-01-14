export const mockAI = {
  async generate(prompt) {
    // রিয়েলিস্টিক ডিলে (Delay) ১.৫ সেকেন্ড
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses = [
        `Based on the parameters provided in "${prompt}", the optimal strategy focuses on vertical scaling. We should isolate the core variables immediately to prevent latency drift.`,
        `Insight generated. The data suggests a 24% efficiency gap. My recommendation is to refactor the logic layer associated with "${prompt}" to ensure compliance standards.`,
        `Analyzing... Confirmed. The bottleneck lies in the asynchronous handling of the request. Deploying a caching mechanism will solve this instantly.`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }
};
