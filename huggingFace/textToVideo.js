import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const API_TOKEN = process.env.API_KEY;
const API_URL = 'https://api.replicate.com/v1/predictions';  // Replace with your API URL

const prompt = 'A futuristic city with flying cars during sunset'; // Example prompt

async function generateVideo() {
  try {
    // Step 1: Start the prediction
    const startResponse = await axios.post(
      API_URL,
      {
        version: 'your_model_version_id',  // Replace with the correct version ID
        input: { prompt },
      },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const predictionId = startResponse.data.id;
    console.log(`Prediction started with ID: ${predictionId}`);

    // Step 2: Poll for the prediction result
    let predictionStatus = 'starting';
    let videoUrl = null;

    while (predictionStatus !== 'succeeded' && predictionStatus !== 'failed') {
      const statusResponse = await axios.get(`${API_URL}/${predictionId}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      predictionStatus = statusResponse.data.status;
      if (predictionStatus === 'succeeded') {
        videoUrl = statusResponse.data.output[0];
      } else if (predictionStatus === 'failed') {
        console.error('Prediction failed');
        return;
      } else {
        console.log('Waiting for prediction to complete...');
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }

    // Step 3: Download and save the video
    if (videoUrl) {
      const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
      fs.writeFileSync('output.mp4', videoResponse.data);
      console.log('Video saved successfully as output.mp4');
    } else {
      console.error('No video URL returned');
    }
  } catch (error) {
    console.error('Error generating video:', error.response ? error.response.data : error.message);
  }
}

generateVideo();
