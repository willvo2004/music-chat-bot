"use server";

import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const prisma = new PrismaClient();

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
      },
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

export async function saveUser(
  email: string,
  name: string,
  refreshToken: string,
) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      await prisma.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          refreshToken: refreshToken,
        },
      });
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: email,
          name: name,
          refreshToken: refreshToken,
        },
      });
      console.log("New user created");
    }
  } catch (error) {
    console.error("Error saving user: ", error);
  } finally {
    await prisma.$disconnect();
  }
}
