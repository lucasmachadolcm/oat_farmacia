
const API_URL = "http://localhost:8000/api/fornecedores/";

// Função para carregar fornecedores da API
async function carregarFornecedores() {
  const response = await fetch(API_URL);
  const fornecedores = await response.json();
  atualizarTabela(fornecedores);
}


function gerarId() {
  return new Date().getTime(); // Gera ID único baseado no tempo
}

// Função para salvar ou atualizar fornecedor
async function salvarFornecedor() {
  const id = document.getElementById("fornecedorId").value || gerarId();;
  const fornecedor = {
    id: id,
    nome: document.getElementById("nomeFornecedor").value,
    cnpj: document.getElementById("cnpjFornecedor").value,
    telefone: document.getElementById("telefoneFornecedor").value,
    email: document.getElementById("emailFornecedor").value,
    cep: document.getElementById("cepFornecedor").value,
    logradouro: document.getElementById("enderecoFornecedor").value,
    numero: document.getElementById("numeroFornecedor").value,
    complemento: document.getElementById("complementoFornecedor").value,
    bairro: document.getElementById("bairroFornecedor").value,
    cidade: document.getElementById("cidadeFornecedor").value,
    uf: document.getElementById("ufFornecedor").value,
  };

  if (document.getElementById("fornecedorId").value) {
    // Atualizar fornecedor existente
    await fetch(`${API_URL}${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fornecedor),
    });
  } else {
    // Criar novo fornecedor
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fornecedor),
    });
  }

  document.getElementById("formFornecedor").reset();
  document.getElementById("fornecedorId").value = "";
  $("#fornecedorModal").modal("hide"); // Fecha o modal
  carregarFornecedores();
  location.reload();
}

// Função para atualizar a tabela de fornecedores
function atualizarTabela(fornecedores) {
  const tabela = document.getElementById("fornecedorLista");
  tabela.innerHTML = "";

  fornecedores.forEach((fornecedor) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${fornecedor.nome}</td>
            <td>${fornecedor.cnpj}</td>
            <td>${fornecedor.telefone}</td>
            <td>${fornecedor.email}</td>
            <td>${fornecedor.logradouro}-${fornecedor.numero}-${fornecedor.complemento}-${fornecedor.bairro}-${fornecedor.cidade}-${fornecedor.uf}</td>
            <td>
                <button onclick="editarFornecedor(${fornecedor.id})" class="btn btn-warning btn-sm">Editar</button>
                <button onclick="excluirFornecedor(${fornecedor.id})" class="btn btn-danger btn-sm">Excluir</button>
            </td>
        `;
    tabela.appendChild(row);
  });
}

// Função para carregar dados do fornecedor no formulário para edição
async function editarFornecedor(id) {
  const response = await fetch(`${API_URL}${id}/`);
  const fornecedor = await response.json();

  document.getElementById("fornecedorId").value = fornecedor.id;
  document.getElementById("nomeFornecedor").value = fornecedor.nome;
  document.getElementById("cnpjFornecedor").value = fornecedor.cnpj;
  document.getElementById("telefoneFornecedor").value = fornecedor.telefone;
  document.getElementById("emailFornecedor").value = fornecedor.email;
  document.getElementById("cepFornecedor").value = fornecedor.cep;
  document.getElementById("enderecoFornecedor").value = fornecedor.logradouro;
  document.getElementById("numeroFornecedor").value = fornecedor.numero;
  document.getElementById("complementoFornecedor").value =
    fornecedor.complemento;
  document.getElementById("bairroFornecedor").value = fornecedor.bairro;
  document.getElementById("cidadeFornecedor").value = fornecedor.cidade;
  document.getElementById("ufFornecedor").value = fornecedor.uf;

  $("#fornecedorModal").modal("show"); // Abre o modal
}

// Função para excluir um fornecedor
async function excluirFornecedor(id) {
  await fetch(`${API_URL}${id}/`, {
    method: "DELETE",
  });
  carregarFornecedores();
}

// Carrega os fornecedores ao abrir a página
document.addEventListener("DOMContentLoaded", carregarFornecedores);

$(document).ready(function () {
  $("#cepFornecedor").on("blur", function () {
    var cep = $(this).val().replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cep.length == 8) {
      // Verifica se o CEP tem 8 dígitos
      $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function (data) {
        console.log(data); // Verifique se os dados estão sendo retornados corretamente
        if (!("erro" in data)) {
          // Preenche os campos com as informações recebidas da API
          $("#enderecoFornecedor").val(data.logradouro); // Endereço
          $("#bairroFornecedor").val(data.bairro); // Bairro
          $("#cidadeFornecedor").val(data.localidade); // Cidade
          $("#ufFornecedor").val(data.uf); // UF
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
