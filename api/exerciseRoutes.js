const express = require('express');
const Fuse = require('fuse.js');
const router = express.Router();
const Exercise = require('./Exercise');

const fuseOptions = {
    includeScore: true,
    threshold: 0.4, // Ajusta a sensibilidade da busca (quanto menor, mais precisa)
    keys: ['name']
};

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

    if (!query) {
        return res.status(400).json({ message: 'Por favor, insira um termo de pesquisa' });
    }

    try {
        const exercises = await Exercise.find(); // Obtém todos os exercícios do banco
            
        const fuse = new Fuse(exercises, fuseOptions); // Cria instância do Fuse.js
        const results = fuse.search(query); // Busca com aproximação
        
        // Filtrar resultados para retornar os exercícios encontrados
        const matchedExercises = results.map(result => result.item); // Pega os itens correspondentes
        // Se não encontrou exercícios correspondentes, retornar sugestões
        if (matchedExercises.length === 0) {
            const suggestions = exercises.filter(exercise => exercise.name.toLowerCase().includes(query.toLowerCase())); // Filtra sugestões
            return res.json({ message: 'Exercício não encontrado. Aqui estão algumas sugestões:', suggestions });
        }

        res.json({ message: 'Exercícios encontrados:', exercises: matchedExercises });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar exercícios', error });
    }
});


module.exports = router;
