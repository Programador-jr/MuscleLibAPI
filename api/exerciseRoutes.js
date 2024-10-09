const express = require('express');
const router = express.Router();
const Exercise = require('./Exercise');

// Rota para obter exercícios
router.get('/', async (req, res) => {
  try {

    const exercises = await Exercise.find();
    
    res.json(exercises);
  } catch (err) {
    console.error('Erro ao buscar exercícios', err.message);
    res.status(500).json({ message: 'Erro ao buscar os exercícios', error: err.message });
  }
});

module.exports = router;
