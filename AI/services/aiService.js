const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const getGeminiResponse = async (ask) => {
  try {
      const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: ask,
    });
    
    return response.text;
      
  } catch(error) {
      console.log(error);
  }
}
   
module.exports = {
  getGeminiResponse
}