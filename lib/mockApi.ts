import { type Classification } from "@/store/themeStore";

export interface ClassifyResult {
  classification: Classification;
  confidence: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function classifyText(text: string, model: string = "mentalbert"): Promise<ClassifyResult> {
  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not set. Add it to .env.local for development."
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  let response: Response;
  try {
    response = await fetch(`${API_URL}/classify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, model }),
      signal: controller.signal,
    });
  } catch (networkError) {
    if ((networkError as Error).name === "AbortError") {
      throw new Error("Request timed out. The model might be cold-starting, try again.");
    }
    throw new Error(
      `Could not reach the VibeCheck API. Is the backend running? (${networkError})`
    );
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    let detail = response.statusText;
    try {
      const body = await response.json();
      detail = body?.detail ?? detail;
    } catch {
      // body wasn't JSON — use statusText fallback
    }
    throw new Error(`API error ${response.status}: ${detail}`);
  }

  const data = await response.json();

  if (typeof data.classification !== "string" || typeof data.confidence !== "number") {
    throw new Error("Unexpected API response shape");
  }

  return {
    classification: data.classification as Classification,
    confidence: data.confidence,
  };
}
