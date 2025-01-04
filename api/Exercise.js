const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: { 
    en: { type: String, required: true },
    pt: { type: String, required: true } 
  },
  force: { 
    en: { type: String, required: true },
    pt: { type: String, required: true } 
  },
  level: { 
    en: { type: String, required: true },
    pt: { type: String, required: true } 
  },
  mechanic: { 
    en: { type: String, required: true },
    pt: { type: String, required: true } 
  },
  equipment: { 
    en: { type: String, required: true },
    pt: { type: String, required: true } 
  },
  primaryMuscles: {
    en: { type: [String], required: true },
    pt: { type: [String], required: true }
  },
  secondaryMuscles: {
    en: { type: [String], required: true },
    pt: { type: [String], required: true }
  },
  instructions: {
    en: { type: [String], required: true },
    pt: { type: [String], required: true }
  },
  category: { 
    en: { type: String, required: true },
    pt: { type: String, required: true } 
  },
  images: { type: [String], required: true }, // Imagens permanecem inalteradas
  id: { type: String, required: true, unique: true } // ID permanece inalterado
});

module.exports = mongoose.model("Exercise", exerciseSchema);
