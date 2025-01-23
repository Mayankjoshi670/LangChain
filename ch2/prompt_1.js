import dotenv from 'dotenv' ; 
dotenv.config() ; 

import {ChatGoogleGenerativeAI} from "@langchain/google-genai"
import {PromptTemplate} from "@langchain/core/prompts"

const chat = new ChatGoogleGenerativeAI({
    apiKey: process.env.GenAi_API_KEY
})
//  string template 

//  way 1


// const StringPromptTemplate =   PromptTemplate.fromTemplate(
//     "tell me a {what} about {topic}"
// ) ; 
//  const result = await StringPromptTemplate.invoke({what : "joke" , topic : "web developer"}) ; 
// console.log(StringPromptTemplate.template) 
// console.log(result.value) ; 

// try{
//     const response =  await chat.invoke(result) ; 
//     console.log(response.content) ; 

// }
// catch(e){
//     console.log("erro while invoking " + e.message) ; 
// }


const  oneInputPrompt = new  PromptTemplate({
    inputVariables : ["what" , "topic"] ,
    template : "Tell me a {what} about {topic}"
})

console.log(oneInputPrompt)
const formattedOneInputPrompt =   await oneInputPrompt.format({what : "news" , topic : "history"}) ; 
console.log(formattedOneInputPrompt) ; 
const response = await chat.invoke(formattedOneInputPrompt) ;
console.log(response.content) ;