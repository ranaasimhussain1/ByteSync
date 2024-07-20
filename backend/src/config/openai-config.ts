import OpenAI from "openai";

export const configureOpenAI = () => {
  const openai = new OpenAI({
    apiKey: process.env["OPEN_AI_SECRET"], // This is the default and can be omitted
  });
  return openai;
};
