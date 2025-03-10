const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  translations: {
    en: { type: String, required: true },
    pt: { type: String, required: true },
    es: { type: String, required: true },
  },
});

module.exports = mongoose.model('Translation', translationSchema);