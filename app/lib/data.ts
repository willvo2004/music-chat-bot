"use server";

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, });

export async function fetchAIResponse(input: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a music enthusiast and an expert in giving music recommendations based on a user's emotions and/or music taste.",
      },
      {
        role: "user",
        content: input,
      }
    ],
    temperature: 0.5,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
const content = completion.choices[0].message.content;
console.log(content);
return content !== null ? content : "";
}

