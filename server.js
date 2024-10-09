require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const exerciseRoutes = require("./api/exerciseRoutes"); // Rota para exercícios
const apiRoutes = require("./api/api");

const dbURI = process.env.MONGODB_URI;
const app = express();
const PORT = process.env.PORT || 8080;

mongoose.set('strictQuery', false);

// Conexão com MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,  // Tempo de timeout aumentado para 30 segundos
})
.then(() => console.log('MongoDB conectado com sucesso!'))
.catch(err => console.log('Erro ao conectar com o MongoDB:', err));

// Middleware
app.use(express.json());

// Rotas
app.use("/api/exercises", exerciseRoutes); // Rota de exercícios
app.use("/api", apiRoutes);

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
