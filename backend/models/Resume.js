const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    fullName: String,

    email: String,

    phone: String,

    location: String,

    summary: String,

    education: [
      {
        institution: String,
        degree: String,
        year: String,
      },
    ],

    experience: [
      {
        company: String,
        role: String,
        description: String,
      },
    ],

    projects: [
      {
        title: String,
        description: String,
        technologies: [String],
      },
    ],

    skills: [String],
    template: {
      type: String,
      default: "modern",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Resume", resumeSchema);
