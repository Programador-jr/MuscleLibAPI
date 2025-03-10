const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const exerciseRoutes = require("../api/exerciseRoutes"); // Rotas de exercícios
const Exercise = require("../api/Exercise"); // Modelo do MongoDB
const Translation = require("../models/translationModel");

const dbURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 8080;

const app = express();

mongoose.set("strictQuery", false);

// Conexão com MongoDB
mongoose.connect(dbURI, {
  socketTimeoutMS: 30000,
  serverSelectionTimeoutMS: 30000
})
.then(() => console.log("MongoDB conectado com sucesso!"))
.catch(err => {
  console.error("Erro ao conectar ao MongoDB:", err);
  process.exit(1); // Sai do processo em caso de falha
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/exercises", express.static(path.resolve(__dirname, "../exercises")));
app.use("/page", express.static(path.resolve(__dirname, "../page")));
app.use("/api/exercises", exerciseRoutes);

// Endpoint para contar exercícios e imagens
app.get("/stats", async (req, res) => {
  try {
    const totalExercises = await Exercise.countDocuments({});
    const totalImages = totalExercises * 2; // Cada exercício tem 2 imagens
    res.json({ totalExercises, totalImages });
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    res.status(500).json({ message: "Erro ao buscar estatísticas", error: error.message });
  }
});

// Rota para buscar traduções
app.get('/translations', async (req, res) => {
  const { lang } = req.query;
  try {
    const translations = await Translation.find({}, { key: 1, [`translations.${lang}`]: 1 });
    const result = {};
    
    translations.forEach((translation) => {
      if (!translation.translations[lang]) {
        console.warn(`Tradução ausente para a chave: ${translation.key} (${lang})`);
      }
      result[translation.key] = translation.translations[lang] || translation.translations["en"];
    });
    
    res.json(result);
  } catch (error) {
    console.error("Erro ao buscar traduções:", error);
    res.status(500).json({ error: "Erro ao buscar traduções" });
  }
});

// Rota principal 
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/../page/index.html'));
});

// Rota para a documentação
app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "../page/docs.html"));
});

// Página 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../page/404.html"));
});

// Manipulador global de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erro interno no servidor", error: err.message });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});