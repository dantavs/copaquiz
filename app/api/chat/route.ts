import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { COPAQUIZ_SYSTEM_PROMPT } from '@/app/lib/chatbot-prompt';

export const maxDuration = 30; // 30 seconds for Vercel

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google('gemini-2.5-flash'), // Using flash for fast, cheap responses
      system: COPAQUIZ_SYSTEM_PROMPT,
      messages,
      temperature: 0.1, // Low temperature for factual responses
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('An error occurred during the chat request.', { status: 500 });
  }
}
