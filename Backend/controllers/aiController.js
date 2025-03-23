const axios = require("axios");

exports.getAIResponse = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // Call OpenAI API (Make sure your API key is in `.env`)
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100,
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ response: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error("AI API Error:", error);
    res.status(500).json({ message: "Error processing AI response" });
  }
};
