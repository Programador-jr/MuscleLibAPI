const express = require('express');
const router = express.Router();
const Exercise = require('./Exercise');

// Nova rota para buscar exercícios
router.get('/exercises', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    console.error("Erro ao buscar exercícios:", error);
    res.status(500).send("Erro ao buscar exercícios.");
  }
});

module.exports = router;
