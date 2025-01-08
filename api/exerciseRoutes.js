const express = require("express");
const Fuse = require("fuse.js");
const router = express.Router();
const Exercise = require("./Exercise");

const fuseOptions = {
  includeScore: true,
  threshold: 0.4,
  keys: ["name.en", "name.pt"], // Busca em ambos os idiomas
};

// Mensagens de erro localizadas
const errorMessages = {
  invalidLang: {
    en: "Invalid language. Use 'en' or 'pt'.",
    pt: "Idioma inválido. Use 'en' ou 'pt'.",
  },
  missingQuery: {
    en: "Please provide a search term.",
    pt: "Por favor, insira um termo de pesquisa.",
  },
  noResults: {
    en: "Exercise not found.",
    pt: "Exercício não encontrado.",
  },
  fetchError: {
    en: "Error fetching exercises.",
    pt: "Erro ao buscar os exercícios.",
  },
  searchError: {
    en: "Error searching exercises.",
    pt: "Erro ao buscar exercícios.",
  },
};

// Rota para obter exercícios paginados em um idioma específico
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 50;
    const lang = req.query.lang || "en"; // Idioma padrão é inglês

    if (!["en", "pt"].includes(lang)) {
      return res
        .status(400)
        .json({ message: errorMessages.invalidLang[lang] || errorMessages.invalidLang.en });
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
    console.error(
      lang === "pt"
        ? `${errorMessages.fetchError.pt}: ${err.message}`
        : `${errorMessages.fetchError.en}: ${err.message}`
    );
    res.status(500).json({
      message: errorMessages.fetchError[lang] || errorMessages.fetchError.en,
      error: err.message,
    });
  }
});

// Rota para buscar exercícios com idioma
router.get("/search", async (req, res) => {
  const { query, lang = "en" } = req.query;

  if (!["en", "pt"].includes(lang)) {
    return res
      .status(400)
      .json({ message: errorMessages.invalidLang[lang] || errorMessages.invalidLang.en });
  }

  if (!query) {
    return res
      .status(400)
      .json({ message: errorMessages.missingQuery[lang] || errorMessages.missingQuery.en });
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
        images: [
          `/exercises/${exercise.id}/0.jpg`,
          `/exercises/${exercise.id}/1.jpg`,
        ],
        id: exercise.id,
      };
    });

    // Se nenhum exercício foi encontrado
    if (matchedExercises.length === 0) {
      return res.json({ message: errorMessages.noResults[lang] || errorMessages.noResults.en });
    }

    // Retornar os exercícios encontrados
    res.json({ message: "Exercises found:", exercises: matchedExercises });
  } catch (err) {
    console.error(
      lang === "pt"
        ? `${errorMessages.searchError.pt}: ${err.message}`
        : `${errorMessages.searchError.en}: ${err.message}`
    );
    res.status(500).json({
      message: errorMessages.searchError[lang] || errorMessages.searchError.en,
      error: err.message,
    });
  }
});

module.exports = router;
