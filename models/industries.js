const mongoose = require("mongoose");


const industrySchema = new mongoose.Schema(
  {
    avatar_associated: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    description: { type: String },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    prompt: { type: String },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending"],
      default: "Pending",
    },
    token: { type: String },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

const Industry = mongoose.model("industries", industrySchema);

module.exports = Industry;
