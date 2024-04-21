import { Models, genAi } from "./init";

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(data64: string, mimeType: string) {
  return {
    inlineData: {
      data: data64, //Needs base64 string,
      mimeType,
    },
  };
}

async function useImageTextGenAi(
  data64: string,
  mimeType: string,
  prompt: string
) {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAi.getGenerativeModel({ model: Models.GEMINI_PRO_VISION });
  const imageParts = [fileToGenerativePart(data64, mimeType)];
  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  return text;
}

export default useImageTextGenAi;
