const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
require("dotenv").config();
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");
const { ChatMistralAI } = require("@langchain/mistralai");

const geminimodel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});
const mistralmodel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const generateResponse = async (message) => {
  try {
    const aiResponse = await geminimodel.invoke([new HumanMessage(message)]);
    return aiResponse.content;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
};

const generateTitle = async (message) => {
  try {
    const aiResponse = await mistralmodel.invoke([
      new SystemMessage(
        `Analyze the following text and generate a concise title that captures its essence in a few words`
      ),
      new HumanMessage(message)
    ]);
    return aiResponse.content;
  } catch (error) {
    console.error("Error generating title:", error);
    throw error;
  }
};

module.exports = { generateResponse, generateTitle };
