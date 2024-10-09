require('dotenv').config();
const cors = require("cors");
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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir requisições de qualquer origem
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// Rotas
app.use(cors());
app.use("/api/exercises", exerciseRoutes); // Rota de exercícios
app.use("/api", apiRoutes);
app.get('/api/exercises', (req, res) => {
  res.json({ message: 'Requisição permitida para qualquer origem' });
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
