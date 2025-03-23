const express = require("express");
const OpenAI = require("openai");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/advice", protect, async (req, res) => {
  const { mood } = req.body;

  if (!mood) {
    return res.status(400).json({ message: "Mood is required" });
  }

  try {
    console.log("🔹 Sending request to OpenAI with mood:", mood);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",  // ✅ Ensure the model is valid
      messages: [
        { role: "system", content: "You are a supportive mental health assistant." },
        { role: "user", content: `I'm feeling ${mood}. Can you give me some advice?` },
      ],
      max_tokens: 100,
    });

    console.log("✅ OpenAI Response:", response);

    if (!response || !response.choices || response.choices.length === 0) {
      console.error("❌ Invalid AI response:", response);
      return res.status(500).json({ message: "Invalid AI response from OpenAI" });
    }

    res.json({ advice: response.choices[0].message.content });

  } catch (error) {
    console.error("❌ AI API Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Error processing AI response",
      error: error.response?.data || error.message,
    });
  }
});

module.exports = router;
