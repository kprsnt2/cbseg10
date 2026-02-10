import { generateText } from 'ai';
import { geminiModel } from '@/lib/ai';

export interface ExplanationState {
    topic: string;
    explanation: string;
}

export async function explainTopic(topic: string, simplify: boolean = false) {
    const prompt = `You are an expert CBSE Grade 10 teacher. 
  Explain the topic "${topic}" clearly and concisely. 
  ${simplify ? 'Explain it like I am 5 years old, using simple analogies.' : 'Provide a standard Grade 10 level explanation.'}
  Structure the response with:
  - Definition
  - Key Concepts
  - Real-world Example
  - Importance for Exams
  Format using Markdown.`;

    const { text } = await generateText({
        model: geminiModel,
        prompt: prompt,
    });

    return text;
}

export async function generateQuiz(topic: string) {
    const prompt = `Generate a 5-question multiple choice quiz for CBSE Grade 10 students on the topic "${topic}".
  Return ONLY a JSON array of objects. Each object should have:
  - question (string)
  - options (array of 4 strings)
  - answer (string, the correct option text)
  - explanation (string, why this is correct)
  
  Do not include markdown code blocks (like \`\`\`json). Just the raw JSON.`;

    const { text } = await generateText({
        model: geminiModel,
        prompt: prompt,
    });

    try {
        // Clean up if model adds backticks
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanedText);
    } catch (e) {
        console.error("Failed to parse quiz JSON", e);
        return [];
    }
}
