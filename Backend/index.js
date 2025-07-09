require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota POST para criar agendamento
app.post('/agendamentos', async (req, res) => {
  const { nome, especialidade, data, hora } = req.body;

  const diaSemana = new Date(data).getDay(); // 0 = domingo
  if (diaSemana === 0) {
    return res
      .status(400)
      .json({ mensagem: 'Domingo não é dia de atendimento. Escolha outro dia 😉.' });
  }

  try {
    const existente = await prisma.agendamento.findFirst({
      where: { data, hora }
    });

    if (existente) {
      return res.status(400).json({ mensagem: 'Horário já agendado.' });
    }

    const novo = await prisma.agendamento.create({
      data: { nome, especialidade, data, hora }
    });

    res.status(201).json(novo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar agendamento.' });
  }
});

// Rota GET para listar todos os agendamentos
app.get('/horarios-ocupados', async (req, res) => {
  try {
    const agendamentos = await prisma.agendamento.findMany();
    res.json(agendamentos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar agendamentos.' });
  }
});

// Rota padrão "/"
app.get('/', (req, res) => {
  res.send('API de agendamentos no ar!');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});