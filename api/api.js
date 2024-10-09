const express = require('express');
const router = express.Router();
const Exercise = require('./Exercise');

const app = express();


app.get('/api/exercises', async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 20;

  try {
      const exercises = await Exercise.find()
          .skip(page * limit)
          .limit(limit);
      
      if (!exercises.length) {
          return res.status(404).json({ message: 'Nenhum exercício encontrado' });
      }

      res.json(exercises);
  } catch (error) {
      console.error('Erro na busca de exercícios:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
  }
  const totalCount = await Exercise.countDocuments();
res.json({
    total: totalCount,
    exercises: exercises,
});

});


module.exports = router;
