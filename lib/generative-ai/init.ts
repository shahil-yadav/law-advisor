import { GoogleGenerativeAI } from "@google/generative-ai";

export enum Models {
  GEMINI_PRO = "gemini-pro",
  GEMINI_PRO_VISION = "gemini-pro-vision",
}

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
if (API_KEY === undefined)
  throw new Error("Env file is not properly loaded, check it");
export const genAi = new GoogleGenerativeAI(API_KEY);
