const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

mongoose.connect("mongodb://localhost:27017/aroundb");

const { createUser, login } = require("./controllers/users");

const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/error");

const { validateSignup, validateSignin } = require("./middlewares/validation");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use(express.json());

// Registra as requisições recebidas
app.use(requestLogger);

// Rota para testar a recuperação do servidor
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("O servidor travará agora");
  }, 0);
});

// Rotas públicas com validação
app.post("/signup", validateSignup, createUser);
app.post("/signin", validateSignin, login);

// Autorização para todas as rotas seguintes
app.use(auth);

// Rotas protegidas
app.use(usersRouter);
app.use(cardsRouter);

// Rota não encontrada
app.use((req, res) => {
  res.status(404).send({
    message: "Recurso requisitado não encontrado"
  });
});

// Registra os erros antes do tratamento centralizado
app.use(errorLogger);

// Tratamento centralizado de erros
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
