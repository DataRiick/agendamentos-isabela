const express = require("express");
const router = express.Router();
const { criarAgendamento } = require("../controllers/agendamentos");

router.post("/", criarAgendamento); // POST /agendamentos

module.exports = router;