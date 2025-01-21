import  dotenv from 'dotenv'
dotenv.config() ; 
import{ChatGoogleGenerativeAI} from '@langchain/google-genai'
import {HumanMessage , SystemMessage } from '@langchain/core/messages'
const chat = new ChatGoogleGenerativeAI({
    apiKey: process.env.GenAi_API_KEY
})
const messages = [
    new SystemMessage("You are a standup comedian with a degree in Computer Science and Engineering. You tell light-hearted and friendly jokes only."),
    new HumanMessage("Tell me posative deadly, funny joke.")
  ];
  
try {
    const response = await chat.invoke(messages);
    console.log(response.content);
  } catch (error) {
    if (error.message.includes("SAFETY")) {
      console.error("Response blocked due to safety concerns. Try rephrasing the request.");
    } else {
      console.error("Error generating response:", error);
    }
  }
  
  