const express = require("express");
const Fuse = require("fuse.js");
const router = express.Router();
const Exercise = require("./Exercise");

const fuseOptions = {
  includeScore: true,
  threshold: 0.4,
  keys: ["name.en", "name.pt"], // Busca em ambos os idiomas
};

// Rota para obter exercícios paginados em um idioma específico
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 50;
    const lang = req.query.lang || "en"; // Idioma padrão é inglês

    if (!["en", "pt"].includes(lang)) {
      return res.status(400).json({ message: "Idioma inválido. Use 'en' ou 'pt'." });
    }

    const exercises = await Exercise.find()
      .skip(page * limit)
      .limit(limit)
      .lean();

    // Formatar os resultados com base no idioma solicitado
    const formattedExercises = exercises.map((exercise) => ({
      _id: exercise._id,
      name: exercise.name[lang],
      force: exercise.force[lang],
      level: exercise.level[lang],
      mechanic: exercise.mechanic[lang],
      equipment: exercise.equipment[lang],
      primaryMuscles: exercise.primaryMuscles[lang],
      secondaryMuscles: exercise.secondaryMuscles[lang],
      instructions: exercise.instructions[lang],
      category: exercise.category[lang],
      images: exercise.images,
      id: exercise.id,
    }));

    res.json(formattedExercises);
  } catch (err) {
    console.error("Erro ao buscar exercícios:", err);
    res.status(500).json({ message: "Erro ao buscar os exercícios", error: err.message });
  }
});

// Rota para buscar exercícios com idioma
router.get("/search", async (req, res) => {
  const { query, lang = "en" } = req.query;

  if (!["en", "pt"].includes(lang)) {
    return res.status(400).json({ message: "Idioma inválido. Use 'en' ou 'pt'." });
  }

  if (!query) {
    return res.status(400).json({ message: "Por favor, insira um termo de pesquisa" });
  }

  try {
    const exercises = await Exercise.find().lean(); // Obtém todos os exercícios

    const fuse = new Fuse(exercises, {
      ...fuseOptions,
      keys: [`name.${lang}`], // Busca apenas no idioma solicitado
    });

    const results = fuse.search(query);

    // Filtrar os exercícios correspondentes
    const matchedExercises = results.map((result) => {
      const exercise = result.item;
      return {
        _id: exercise._id,
        name: exercise.name[lang],
        force: exercise.force[lang],
        level: exercise.level[lang],
        mechanic: exercise.mechanic[lang],
        equipment: exercise.equipment[lang],
        primaryMuscles: exercise.primaryMuscles[lang],
        secondaryMuscles: exercise.secondaryMuscles[lang],
        instructions: exercise.instructions[lang],
        category: exercise.category[lang],
        images: exercise.images,
        id: exercise.id,
      };
    });

    if (matchedExercises.length === 0) {
      return res.json({ message: "Exercício não encontrado." });
    }

    res.json({ message: "Exercícios encontrados:", exercises: matchedExercises });
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar exercícios", error: err.message });
  }
});

module.exports = router;
