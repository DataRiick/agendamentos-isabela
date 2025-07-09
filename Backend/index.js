require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

app.post('/agendamentos', async (req, res) => {
  const { nome, especialidade, data, hora } = req.body;
   const diaSemana = new Date(data).getDay();   // 0 = domingo
  if (diaSemana === 0) {
    return res
      .status(400)
      .json({ mensagem: 'Domingo não é dia de atendimento. Escolha outro dia 😉.' });}
  try {
    const existente = await prisma.agendamento.findFirst({ where: { data, hora } });
    if (existente) return res.status(400).json({ mensagem: 'Horário já agendado.' });

    const novo = await prisma.agendamento.create({ data: { nome, especialidade, data, hora } });
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar agendamento.' });
  }
});

app.get('/horarios-ocupados', async (req, res) => {
  const agendamentos = await prisma.agendamento.findMany();
  res.json(agendamentos);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
