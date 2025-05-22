const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
   description: {
    type: String,
    default: "",
  },
  skills: {
    type: [String],
    required: true,
  },
  jobType: {
    type: String,
    enum: ["Remote", "Hybrid", "Onsite"],
    required: true,
  },
   salary: {
    type: Number,
    required: true,
  },
  experienceInYears: {
    type: Number,
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

const Jobs = mongoose.models.Jobs || mongoose.model("Jobs", jobSchema);

module.exports = Jobs;