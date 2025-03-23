const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Ensure protect is a function and correctly passed as middleware
router.get("/", protect, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const affirmations = [
      "You are strong!",
      "You are capable!",
      "You matter!",
      "You are loved!",
      "Your feelings are valid!",
      "You can handle anything that comes your way!"
    ];

    res.json({ user: req.user.name || "User", affirmations });
  } catch (error) {
    console.error("Error fetching affirmations:", error);
    res.status(500).json({ message: "Error fetching affirmations" });
  }
});

module.exports = router;
