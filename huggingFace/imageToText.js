 import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
import fetch from "node-fetch";  
dotenv.config();

// Specify the Hugging Face access token
const Access_TOKEN = process.env.API_KEY;

if (!Access_TOKEN) {
  throw new Error("API_KEY is not defined in your environment variables.");
}

// Initialize the Hugging Face inference class
const inference = new HfInference(Access_TOKEN);

// Define the model and the image URL
// const model = "Xenova/vit-gpt2-image-captioning";
const model = "nlpconnect/vit-gpt2-image-captioning"; // Official model

const imageUrl =
//   "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
"https://images.unsplash.com/photo-1475809913362-28a064062ccd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const processImageCaptioning = async () => {
  try {
    // Fetch the image
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch the image: ${response.statusText}`);
    }

    const imageBlob = await response.blob();  
    // Use imageToText function to get the image caption
    const result = await inference.imageToText({
      data: imageBlob,
      model: model,
    });

    console.log(result);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

processImageCaptioning();
