const API_URL = "http://localhost:8000/api/funcionarios/";

// Função para carregar funcionários da API
async function carregarFuncionarios() {
  const response = await fetch(API_URL);
  const funcionarios = await response.json();
  atualizarTabela(funcionarios);
}

function gerarId() {
  return new Date().getTime(); // Gera ID único baseado no tempo
}

// Função para salvar ou atualizar funcionário
async function salvarFuncionario() {
  const id = document.getElementById("funcionarioId").value || gerarId();;
  const funcionario = {
    id: id,
    nome: document.getElementById("nomeFuncionario").value,
    cpf: document.getElementById("cpfFuncionario").value,
    telefone: document.getElementById("telefoneFuncionario").value,
    email: document.getElementById("emailFuncionario").value,
    cep: document.getElementById("cepFuncionario").value,
    logradouro: document.getElementById("enderecoFuncionario").value,
    numero: document.getElementById("numeroFuncionario").value,
    complemento: document.getElementById("complementoFuncionario").value,
    bairro: document.getElementById("bairroFuncionario").value,
    cidade: document.getElementById("cidadeFuncionario").value,
    uf: document.getElementById("ufFuncionario").value,
    cargo: document.getElementById("cargoFuncionario").value,
    salario: document.getElementById("salarioFuncionario").value,
    data_admissao: document.getElementById("dataAdmissaoFuncionario").value,
  };

  if (document.getElementById("funcionarioId").value) {
    // Atualizar funcionário existente
    await fetch(`${API_URL}${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(funcionario),
    });
  } else {
    // Criar novo funcionário
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(funcionario),
    });
  }

  document.getElementById("formFuncionario").reset();
  document.getElementById("funcionarioId").value = "";
  $("#funcionarioModal").modal("hide"); // Fecha o modal
  carregarFuncionarios();
  location.reload();
}

// Função para atualizar a tabela de funcionários
function atualizarTabela(funcionarios) {
  const tabela = document.getElementById("funcionarioLista");
  tabela.innerHTML = "";

  funcionarios.forEach((funcionario) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${funcionario.nome}</td>
                    <td>${funcionario.cpf}</td>
                    <td>${funcionario.telefone}</td>
                    <td>${funcionario.email}</td>
                    <td>${funcionario.cargo}</td>
                    <td>${funcionario.salario}</td>
                    <td>${funcionario.logradouro}-${funcionario.numero}-${funcionario.complemento}-${funcionario.bairro}-${funcionario.cidade}-${funcionario.uf}</td>
                    <td>
                        <button onclick="editarFuncionario(${funcionario.id})" class="btn btn-warning btn-sm">Editar</button>
                        <button onclick="excluirFuncionario(${funcionario.id})" class="btn btn-danger btn-sm">Excluir</button>
                    </td>
                `;
    tabela.appendChild(row);
  });
}

// Função para carregar dados do funcionário no formulário para edição
async function editarFuncionario(id) {
  const response = await fetch(`${API_URL}${id}`);
  const funcionario = await response.json();

  document.getElementById("funcionarioId").value = funcionario.id;
  document.getElementById("nomeFuncionario").value = funcionario.nome;
  document.getElementById("cpfFuncionario").value = funcionario.cpf;
  document.getElementById("telefoneFuncionario").value = funcionario.telefone;
  document.getElementById("emailFuncionario").value = funcionario.email;
  document.getElementById("cepFuncionario").value = funcionario.cep;
  document.getElementById("enderecoFuncionario").value = funcionario.logradouro;
  document.getElementById("numeroFuncionario").value = funcionario.numero;
  document.getElementById("complementoFuncionario").value = funcionario.complemento;
  document.getElementById("bairroFuncionario").value = funcionario.bairro;
  document.getElementById("cidadeFuncionario").value = funcionario.cidade;
  document.getElementById("ufFuncionario").value = funcionario.uf;
  document.getElementById("cargoFuncionario").value = funcionario.cargo;
  document.getElementById("salarioFuncionario").value = funcionario.salario;
  document.getElementById("dataAdmissaoFuncionario").value =funcionario.data_admissao;

  $("#funcionarioModal").modal("show"); // Abre o modal
}

// Função para excluir um funcionário
async function excluirFuncionario(id) {
  await fetch(`${API_URL}${id}/`, {
    method: "DELETE",
  });
  carregarFuncionarios();
}

// Carrega os funcionários ao abrir a página
document.addEventListener("DOMContentLoaded", carregarFuncionarios);

$(document).ready(function () {
  $("#cepFuncionario").on("blur", function () {
    var cep = $(this).val().replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cep.length == 8) {
      // Verifica se o CEP tem 8 dígitos
      $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function (data) {
        console.log(data); // Verifique se os dados estão sendo retornados corretamente
        if (!("erro" in data)) {
          // Preenche os campos com as informações recebidas da API
          $("#enderecoFuncionario").val(data.logradouro); // Endereço
          $("#bairroFuncionario").val(data.bairro); // Bairro
          $("#cidadeFuncionario").val(data.localidade); // Cidade
          $("#ufFuncionario").val(data.uf); // UF
        } else {
          alert("CEP não encontrado.");
        }
      }).fail(function () {
        alert("Erro ao acessar a API de CEP.");
      });
    } else {
      alert("CEP inválido.");
    }
  });
});
