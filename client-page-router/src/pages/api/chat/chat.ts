import type { NextRequest } from 'next/server';

import { OpenAI } from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const config = {
  runtime: 'edge',
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function POST(req: NextRequest) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();
  console.log(messages);
  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messages,
    max_tokens: 500,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
