
// Hugging Face API Call: The textToImage method from Hugging Face's API returns the generated image in the form of a Blob (which is a binary large object).

// Blob to ArrayBuffer: Since the Blob can't be directly saved with fs.writeFile() in Node.js, you need to convert the Blob into an ArrayBuffer using the arrayBuffer() method.

// ArrayBuffer to Buffer: Once you have the ArrayBuffer, you convert it into a Buffer using Buffer.from() (which is how Node.js handles binary data).

// Save with fs.writeFile(): Finally, the Buffer is written to a file using fs.writeFile().

import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const API_KEY = process.env.API_KEY;

const inference = new HfInference(API_KEY);

const model = 'black-forest-labs/FLUX.1-dev';
// const prompt = 'A cute black and white dog';
// const prompt = 'a man riding black and white horse in mountain '
 
try {
  // Generate an image from the prompt (this will return a Blob)
  const imageBlob = await inference.textToImage({
    model: model,
    inputs: prompt,
  });

  // Convert Blob to Buffer
  const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());

  // Save the Buffer as an image file
//   fs.writeFile('output.jpg', imageBuffer, (err) => {
    fs.writeFile('output3.jpg', imageBuffer, (err) => {
    if (err) {
      console.error('Error saving the image:', err.message);
    } else {
      console.log('Image saved successfully as output.jpg');
    }
  });
} catch (error) {
  console.error('Error generating image:', error.message);
}
