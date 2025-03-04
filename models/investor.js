const mongoose = require("mongoose");

const investorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },  
  Allganize_key: { type: String, default: null },
  approaches: { type: Array, default: [] }, 
  avatar: { type: String, required: true },  
  belongTo: { type: String, required: true, enum: ["sc", "B2c", "General"] }, 
  byPass: { type: Boolean, default: false },
  color: { type: String, default: null },
  content: { type: String, default: null },
  context: { type: String, default: null },
  conversation_history: { type: Object, default: {} },
  Conversation_id: { type: String, default: null },
  conversational_AI: { type: String, required: true, enum: ["PIE", "GPT", "BARD"] }, 
  country: { type: String, default: null },
  course: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }, 
  current_Position: { type: String, default: null },
  cus_id: { type: String, required: true },
});

module.exports = mongoose.model("Investor", investorSchema, "investor_table");
