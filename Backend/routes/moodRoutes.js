const express = require("express");
const Mood = require("../models/Mood");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Add a new mood entry
router.post("/", protect, async (req, res) => {
  const { mood, description } = req.body;

  try {
    const moodEntry = await Mood.create({
      user: req.user.id,
      mood,
      description,
    });

    res.status(201).json(moodEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's mood history
router.get("/", protect, async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
