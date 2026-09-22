const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const generateWeatherInsight = async (weatherData) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
    });

    const prompt = `
Give a simple weather summary and useful recommendations
based on the following weather data:

${JSON.stringify(weatherData)}
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Gemini AI error:", error.message);

    if (
      error.message.includes("429") ||
      error.message.toLowerCase().includes("quota")
    ) {
      return "AI insights are temporarily unavailable because the Gemini API free-tier quota has been reached.";
    }

    return "AI weather insight is currently unavailable.";
  }
};

module.exports = {
  generateWeatherInsight,
};