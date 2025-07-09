const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function criarAgendamento(req, res) {
  try {
    const { nome, email, data, horario } = req.body;

    const agendamento = await prisma.agendamento.create({
      data: {
        nome,
        email,
        data,
        horario,
      },
    });

    res.status(201).json(agendamento);
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    res.status(500).json({ error: "Erro interno ao criar agendamento" });
  }
}

module.exports = { criarAgendamento };