const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const exerciseRoutes = require("./api/exerciseRoutes");
require('dotenv').config()

const dbURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 8080;

const app = express();

mongoose.set("strictQuery", false);

// Conexão com MongoDB
mongoose.connect(dbURI, {
  socketTimeoutMS: 45000, // Tempo limite do socket (opcional)
  serverSelectionTimeoutMS: 45000 // Tempo para seleção do servidor
})
.then(() => console.log('MongoDB conectado com sucesso!'))
.catch(err => console.log('Erro ao conectar ao MongoDB:', err));


// Middleware
app.use(cors());
app.use(express.json());
app.use("/exercises", express.static(__dirname + "/exercises"));
app.use("/api/exercises", exerciseRoutes); // Usar rotas atualizadas
//app.use("/page", express.static(__dirname + "/page"));

app.get("/", (req, res) => {
  res.send("API em execução...");
 // res.sendFile(__dirname + '/page/index.html');
});

/*app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + '/page/404.html');
});*/

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
