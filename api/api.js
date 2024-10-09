const express = require('express');
const router = express.Router();
const Exercise = require('./Exercise');

// Rota para buscar todos os exercícios
router.get('/exercises', async (req, res) => {
  try {
    const exercises = await Exercise.find(); // Busca todos os exercícios no banco de dados
    res.json(exercises); // Retorna os exercícios como JSON
  } catch (error) {
    console.error("Erro ao buscar exercícios:", error);
    res.status(500).send("Erro ao buscar exercícios.");
  }
});

module.exports = router;
