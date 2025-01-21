import dotenv from 'dotenv';
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GenAi_API_KEY,  
  model: "gemini-pro",  
  
});

async function generateResponse() {
  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "who is known as the father of indian nation " },
  ];

  try {
    const response = await llm.call(messages);
    console.log(response.content);
  } catch (error) {
    console.error("Error generating response:", error);
  }
}

generateResponse();
