const mongoose = require("mongoose");

const UserProfile= new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  yearsOfExperience: {
    type: Number,
    default: 0,
    min: 0,
  },
  skills: {
    type: [String],
    default: [],
  },
  preferredJobType: {
    type: String,
    enum: ["remote", "onsite", "any"],
    default: "any",
  },
}, { timestamps: true });

module.exports = mongoose.model("UserProfile", UserProfile);
