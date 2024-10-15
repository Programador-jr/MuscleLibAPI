const express = require('express');
const router = express.Router();
const Exercise = require('./Exercise');

// Rota para obter exercícios paginados
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 50;

        const exercises = await Exercise.find()
            .skip(page * limit)
            .limit(limit);

        res.json(exercises);
    } catch (err) {
        console.error('Erro ao buscar exercícios:', err);
        res.status(500).json({ message: 'Erro ao buscar os exercícios', error: err.message });
    }
});

router.get('/search', async (req, res) => {
    const { query } = req.query;

    try {
        if (!query) {
            return res.status(400).json({ message: 'Por favor, insira um termo de pesquisa' });
        }

        const suggestions = await Exercise.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { equipment: { $regex: query, $options: 'i' } },
                { primaryMuscles: { $regex: query, $options: 'i' } },
                { secondaryMuscles: { $regex: query, $options: 'i' } }
            ]
        }).limit(5);

        if (suggestions.length === 0) {
            return res.json({ message: 'Exercício não encontrado', suggestions: [] });
        }

        const suggestionNames = suggestions.map(exercise => exercise.name);
        res.json({ message: 'Acho que você quis dizer:', suggestions: suggestionNames });
    } catch (error) {
        console.error('Erro ao buscar sugestões de exercícios:', error);
        res.status(500).json({ error: 'Erro ao buscar sugestões' });
    }
});


module.exports = router;
