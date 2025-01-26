const express = require("express");
const Fuse = require("fuse.js");
const router = express.Router();
const Exercise = require("./Exercise");

// Configurações do Fuse.js
const fuseOptions = {
  includeScore: true,
  threshold: 0.4,
  keys: ["name.en", "name.pt"],
};

// Mensagens de erro localizadas
const errorMessages = {
  invalidLang: {
    en: "Invalid language. Use 'en' or 'pt'.",
    pt: "Idioma inválido. Use 'en' ou 'pt'.",
  },
  invalideParametters: {
    en: "The field(s) parameter(s) cannot be empty. Valid fields are:",
    pt: "O(s) parâmetro(s) de campo(s) não pode(m) estar vazio(s). Campos válidos são:",
  },
  invalidFields: {
    en: "Invalid field(s). Valid fields are:",
    pt: "Campo(s) inválido(s). Campos válidos são:",
  },
  missingQuery: {
    en: "Please provide a search term.",
    pt: "Por favor, insira um termo de pesquisa.",
  },
  invalidPage: {
    en: "parameter 'page' is invalid. use a value greater than or equal to 0.",
    pt: "Parâmetro 'page' inválido. use um valor maior ou igual a 0.",
  },
  invalidLimit: {
    en: "parameter 'limit' is invalid. use a value greater than 0.",
    pt: "Parâmetro 'limit' inválido. use um valor maior que 0",
  },
  resultesFound: {
    en: "Exercises found:",
    pt: "Exercícios encontrados:",
  },
  noResults: {
    en: "No exercises found.",
    pt: "Nenhum exercício encontrado.",
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

// Lista de campos válidos
const validFields = [
  "force",
  "level",
  "mechanic",
  "equipment",
  "primaryMuscles",
  "secondaryMuscles",
  "instructions",
  "category",
  "images",
  "name",
];

// Endpoint para obter exercícios com filtros dinâmicos e campos opcionais
router.get("/", async (req, res) => {
  const lang = req.query.lang || "en";
  const fields = req.query.fields ? req.query.fields.split(",") : null;
  const query = {};

  // Validar paremettro 'lang
  if (!["en", "pt"].includes(lang)) {
    return res
      .status(400)
      .json({ message: errorMessages.invalidLang[lang] });
  }

  // Validar parametros 'fields'
  if (req.query.fields === "") {
    return res.status(400).json({
      message: `${errorMessages.invalideParametters[lang] } ${validFields.join(", ")}.`,
    });
  }

  if (fields) {
    const invalidFields = fields.filter((field) => !validFields.includes(field));
    if (invalidFields.length > 0) {
      return res.status(400).json({
        message: `${errorMessages.invalidFields[lang] || errorMessages.invalidFields.en} ${validFields.join(", ")}.`,
        invalidFields,
      })
    }
  }

  try {
    // Filtros dinâmicos
    for (const [key, value] of Object.entries(req.query)) {
      if (!["lang", "fields", "page", "limit"].includes(key)) {
        if (["primaryMuscles", "secondaryMuscles", "level"].includes(key)) {
          query[`${key}.${lang}`] = value; // Campo multilíngue
        } else {
          query[key] = value; // Outros filtros
        }
      }
    }

    // Validação para 'page' e 'limit'
    let page = req.query.page ? parseInt(req.query.page, 10) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit, 10) : 50;

    if (
      (req.query.page && (!Number.isInteger(page) || page < 0))
    ) {
      return res.status(400).json({ message: errorMessages.invalidPage[lang] });
    };

    if (
      (req.query.limit && (!Number.isInteger(limit) || limit < 1))
    ) {
      return res.status(400).json({ message: errorMessages.invalidLimit[lang] });
    }

    page = page || 0;
    limit = limit || 50;

    const exercises = await Exercise.find(query)
      .skip(page * limit)
      .limit(limit)
      .lean();

    if (exercises.length === 0) {
      return res.status(404).json({
        message: errorMessages.noResults[lang],
      });
    }

    const formattedExercises = exercises.map((exercise) => {
      if (fields) {
        // Retorna apenas os campos especificados em 'fields'
        const result = {
          _id: exercise._id,
          name: exercise.name[lang],
        };

        fields.forEach((field) => {
          if (exercise[field]) {
            result[field] = exercise[field][lang] || exercise[field];
          }
        });

        return result;
      }

      // Retorna todos os campos se 'fields' não estiver presente
      return {
        ...exercise,
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

    res.json(formattedExercises);
  } catch (err) {
  res.status(500).json({
      message: errorMessages.fetchError[lang],
      error: err.message,
    });
  }
});

// Rota para buscar exercícios
router.get("/search", async (req, res) => {
  const { query, lang = "en", fields } = req.query;

  // Validar idioma
  if (!["en", "pt"].includes(lang)) {
    return res
      .status(400)
      .json({ message: errorMessages.invalidLang[lang] });
  }

  // Validar termo de busca
  if (!query) {
    return res
      .status(400)
      .json({ message: errorMessages.missingQuery[lang] });
  }

  try {
    // Recuperar todos os exercícios
    const exercises = await Exercise.find().lean();

    // Configurar Fuse.js com base no idioma
    const fuse = new Fuse(exercises, {
      ...fuseOptions,
      keys: [`name.${lang}`],
    });

    // Realizar busca
    const results = fuse.search(query);

    // Verificar se há resultados
    if (results.length === 0) {
      return res.json({ message: errorMessages.noResults[lang] });
    }

    // Converter resultados e aplicar `fields`, se fornecido
    const fieldList = fields ? fields.split(",") : null;
    const matchedExercises = results.map((result) => {
      const exercise = result.item;

      // Montar resposta com todos os campos ou apenas os selecionados
      const response = {
        _id: exercise._id,
        name: exercise.name[lang],
      };

      if (!fieldList || fieldList.includes("force")) {
        response.force = exercise.force[lang];
      }
      if (!fieldList || fieldList.includes("level")) {
        response.level = exercise.level[lang];
      }
      if (!fieldList || fieldList.includes("mechanic")) {
        response.mechanic = exercise.mechanic[lang];
      }
      if (!fieldList || fieldList.includes("equipment")) {
        response.equipment = exercise.equipment[lang];
      }
      if (!fieldList || fieldList.includes("primaryMuscles")) {
        response.primaryMuscles = exercise.primaryMuscles[lang];
      }
      if (!fieldList || fieldList.includes("secondaryMuscles")) {
        response.secondaryMuscles = exercise.secondaryMuscles[lang];
      }
      if (!fieldList || fieldList.includes("instructions")) {
        response.instructions = exercise.instructions[lang];
      }
      if (!fieldList || fieldList.includes("category")) {
        response.category = exercise.category[lang];
      }
      if (!fieldList || fieldList.includes("images")) {
        response.images = [
          `/exercises/${exercise.id}/0.jpg`,
          `/exercises/${exercise.id}/1.jpg`,
        ];
      }

      return response;
    });

   res.json({ message: errorMessages.resultesFound[lang], exercises: matchedExercises });
  } catch (err) {
    console.error(
      lang === "pt"
        ? `${errorMessages.searchError.pt}: ${err.message}`
        : `${errorMessages.searchError.en}: ${err.message}`
    );
    res.status(500).json({
      message: errorMessages.searchError[lang],
      error: err.message,
    });
  }
});

module.exports = router;
