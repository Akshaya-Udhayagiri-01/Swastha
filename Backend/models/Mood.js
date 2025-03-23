const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Ensure this matches your User model name
      required: true,
    },
    mood: {
      type: String,
      required: true,
      enum: ["Happy", "Neutral", "Sad"], // Optional: Restrict values
    },
    description: {
      type: String,
      required: false, // Allow empty descriptions
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mood", moodSchema);
