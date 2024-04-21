import { Models, genAi } from "./init";

const useTextGenAi = async (prompt: string) => {
  const model = genAi.getGenerativeModel({
    model: Models.GEMINI_PRO,
  });
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
};

export default useTextGenAi;
