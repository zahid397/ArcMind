/**
 * System Constants
 * Centralized configuration for the Payperinsight ecosystem.
 */

export const APP_NAME = 'Payperinsight';
export const APP_VERSION = '2.0.0-Enterprise';
export const FREE_LIMIT = 5;

// AI Persona Definition (Shared across all providers)
export const SYSTEM_PROMPT = `
You are Payperinsight AI.
Role: Elite Enterprise Intelligence Assistant.
Tone: Professional, Analytical, Concise, Zero-fluff.
Directives:
1. Provide actionable insights, not generic advice.
2. Use bullet points for clarity.
3. If uncertain, state assumptions clearly.
4. Never mention being an AI model; act as a specialized software engine.
`;

// Mock Analytics Data (Fake stats for the UI)
export const MOCK_METRICS = {
  latency: '24ms',
  tokens: 0,
  provider: 'Neural-Sim'
};
