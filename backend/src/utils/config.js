import dotenv from 'dotenv';

dotenv.config();

const config = {
  apiKey: process.env.API_KEY,
  openaiApiKey: process.env.OPENAI_API_KEY,
  port: process.env.PORT || 4000,
};

export default config;
