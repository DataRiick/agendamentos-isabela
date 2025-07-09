const API_URL = 'http://localhost:3000/agendamentos';

document
  .getElementById('agendaForm')
  .addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. lê os campos
    const nome          = document.getElementById('nome').value.trim();
    const especialidade = document.getElementById('especialidade').value;
    const data          = document.getElementById('data').value;
    const hora          = document.getElementById('hora').value;
    const msgEl         = document.getElementById('mensagem');

    // 2. validação simples
    if (!nome || !especialidade || !data || !hora) {
      msgEl.textContent = 'Por favor, preencha todos os campos.';
      msgEl.style.color = 'red';
      return;
    }

    // 3. monta objeto
    const agendamento = { nome, especialidade, data, hora };

    try {
      const resp = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agendamento),
      });

      const json = await resp.json();

      if (resp.ok) {
        msgEl.textContent = `✅ Horário agendado com sucesso para ${nome} – ${especialidade}!`;
        msgEl.style.color = 'green';
        e.target.reset(); // limpa o formulário
      } else {
        // resp.status 400/500 → backend respondeu com erro
        msgEl.textContent = `❌ Erro: ${json.mensagem || json.error || 'Não foi possível agendar.'}`;
        msgEl.style.color = 'red';
      }
    } catch (err) {
      // não chegou no servidor (offline, CORS, URL errada…)
      console.error(err);
      msgEl.textContent = '❌ Erro ao conectar com o servidor.';
      msgEl.style.color = 'red';
    }
  });