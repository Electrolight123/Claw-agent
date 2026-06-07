import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export function getAgentModel() {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  const modelId = process.env.OPENROUTER_DEFAULT_MODEL?.trim();

  if (!apiKey) {
    throw new Error("Missing OPENROUTER_API_KEY in .env");
  }

  if (!modelId) {
    throw new Error("Missing OPENROUTER_DEFAULT_MODEL in .env");
  }

  const provider = createOpenRouter({ apiKey });

  return provider(modelId);
}