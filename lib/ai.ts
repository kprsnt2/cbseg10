import { google, createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { generateText } from 'ai';

// ── Provider 1: Primary Gemini (uses GOOGLE_GENERATIVE_AI_API_KEY env var) ──
const primaryGemini = google('gemini-2.5-flash-lite');

// ── Provider 2: Backup Gemini (uses GEMINI_BACKUP_API_KEY env var) ──
const backupGoogle = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_BACKUP_API_KEY ?? '',
});
const backupGemini = backupGoogle('gemini-2.5-flash-lite');

// ── Provider 3: NVIDIA NIM fallback (uses NVIDIA_API_KEY env var) ──
const nvidia = createOpenAICompatible({
    name: 'nvidia',
    baseURL: 'https://integrate.api.nvidia.com/v1',
    headers: {
        Authorization: `Bearer ${process.env.NVIDIA_API_KEY ?? ''}`,
    },
});
const nvidiaModel = nvidia('deepseek-ai/deepseek-v3.2');

// ── Fallback chain ──────────────────────────────────────────────────────────
// Tries each provider in order; moves to the next on any error.

interface FallbackOptions {
    prompt: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const models: { name: string; model: any }[] = [
    { name: 'Primary Gemini', model: primaryGemini },
    { name: 'Backup Gemini', model: backupGemini },
    { name: 'NVIDIA (deepseek-v3.2)', model: nvidiaModel },
];

export async function generateWithFallback({ prompt }: FallbackOptions): Promise<string> {
    let lastError: unknown;

    for (const { name, model } of models) {
        try {
            const { text } = await generateText({ model, prompt });
            return text;
        } catch (err) {
            console.warn(`[AI Fallback] ${name} failed, trying next provider…`, err);
            lastError = err;
        }
    }

    throw lastError ?? new Error('All AI providers failed');
}
