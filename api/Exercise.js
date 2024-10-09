const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  force: { type: String },
  level: { type: String, required: true },
  mechanic: { type: String },
  equipment: { type: String },
  primaryMuscles: { type: [String], required: true },
  secondaryMuscles: { type: [String] },
  instructions: { type: [String], required: true },
  category: { type: String, required: true },
  images: { type: [String], required: true },
  id: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Exercise", exerciseSchema);
