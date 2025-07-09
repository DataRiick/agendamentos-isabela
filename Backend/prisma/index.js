const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste raiz
app.get("/", (req, res) => {
  res.send("🚀 API de agendamentos está funcionando!");
});

// Rotas
const agendamentoRoutes = require("./routes/agendamentos");
app.use("/agendamentos", agendamentoRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});