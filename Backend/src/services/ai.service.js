const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
require("dotenv").config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

// const generateResponse = async () => {
//   try {
//     const aiResponse = await model.invoke(
//       "What will be the cost of importing Ford TRX truck from dubai on-road in india? only give final price"
//     );
//     console.log(aiResponse);
//     return aiResponse;
//   } catch (error) {
//     console.error("Error generating response:", error);
//     throw error;
//   }
// };

module.exports = generateResponse;
