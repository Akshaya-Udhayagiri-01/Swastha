const Mood = require("../models/Mood");

// ✅ Function to add a new mood
exports.addMood = async (req, res) => {
  try {
    const { mood, description } = req.body;

    const newMood = await Mood.create({
      user: req.user._id,
      mood,
      description,
    });

    res.status(201).json(newMood);
  } catch (error) {
    console.error("Error saving mood:", error);
    res.status(500).json({ message: "Error saving mood" });
  }
};

// ✅ Function to get moods
exports.getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user._id });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching moods" });
  }
};
