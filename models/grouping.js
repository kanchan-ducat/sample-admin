const mongoose = require("mongoose");

const GroupingSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "General Grouping" }, // Default name if grouping is not used
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true }, // Tenant Reference
  industry: { type: mongoose.Schema.Types.ObjectId, ref: "Industry", required: true }, // Industry Reference
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }], // Subjects linked to this grouping
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Grouping", GroupingSchema);
