const API_URL = "http://localhost:8000/api/receitas/";


// Função para carregar receitas da API
async function carregarReceitas() {
  const response = await fetch(API_URL);
  const receitas = await response.json();
  atualizarTabela(receitas);
}

// Função para gerar ID único (baseado no tempo)
function gerarId() {
  return new Date().getTime(); // Gera ID único baseado no tempo
}

// Função para salvar ou atualizar receita
async function salvarReceita() {
  const id = document.getElementById("receitaId").value || gerarId(); // Gera ID se não existir

  const receita = {
    id: id, // Inclua o ID no objeto receita
    nome_paciente: document.getElementById("nomePaciente").value,
    nome_medico: document.getElementById("nomeMedico").value,
    crm: document.getElementById("crmMedico").value,
    data: document.getElementById("dataReceita").value,
    medicamentos_prescritos: document.getElementById("medicamentos").value,
    dosagem: document.getElementById("dosagem").value,
  };

  if (document.getElementById("receitaId").value) {
    // Atualizar receita existente
    await fetch(`${API_URL}${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(receita),
    });
  } else {
    // Criar nova receita
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(receita),
    });
  }

  // Resetando o formulário e fechando o modal
  document.getElementById("formReceita").reset();
  document.getElementById("receitaId").value = "";
  $("#receitaModal").modal("hide"); // Fecha o modal
  carregarReceitas(); 
  location.reload();
}

// Função para atualizar a tabela de receitas
function atualizarTabela(receitas) {
  const tabela = document.getElementById("receitaLista");
  tabela.innerHTML = "";

  receitas.forEach((receita) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${receita.nome_paciente}</td>
      <td>${receita.nome_medico}</td>
      <td>${receita.crm}</td>
      <td>${new Date(receita.data).toLocaleDateString("pt-BR")}</td>
      <td>${receita.medicamentos_prescritos}</td>
      <td>
        <button onclick="editarReceita(${receita.id})" class="btn btn-warning btn-sm">Editar</button>
        <button onclick="excluirReceita(${receita.id})" class="btn btn-danger btn-sm">Excluir</button>
      </td>
    `;
    tabela.appendChild(row);
  });
}

// Função para carregar dados da receita no formulário para edição
async function editarReceita(id) {
  const response = await fetch(`${API_URL}${id}`);
  const receita = await response.json();

  document.getElementById("receitaId").value = receita.id;
  document.getElementById("nomePaciente").value = receita.nome_paciente;
  document.getElementById("nomeMedico").value = receita.nome_medico;
  document.getElementById("crmMedico").value = receita.crm;
  document.getElementById("dataReceita").value = receita.data;
  document.getElementById("medicamentos").value = receita.medicamentos_prescritos;
  document.getElementById("dosagem").value = receita.dosagem;

  $("#receitaModal").modal("show"); // Abre o modal
}

// Função para excluir uma receita
async function excluirReceita(id) {
  const confirmarExclusao = confirm("Tem certeza que deseja excluir esta receita?");
  if (confirmarExclusao) {
    await fetch(`${API_URL}${id}/`, {
      method: "DELETE",
    });
    carregarReceitas(); // Atualiza a lista de receitas
  }
}

// Carrega as receitas ao abrir a página
document.addEventListener("DOMContentLoaded", carregarReceitas);
