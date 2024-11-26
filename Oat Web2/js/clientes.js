const API_URL = "http://localhost:8000/api/clientes/"; // URL da API

// Função para carregar clientes da API
async function carregarClientes() {
  const response = await fetch(API_URL);
  const clientes = await response.json();
  atualizarTabela(clientes);
}

function gerarId() {
  return new Date().getTime(); // Gera ID único baseado no tempo
}

// Função para salvar ou atualizar cliente
async function salvarCliente() {
  const id = document.getElementById("clienteId").value || gerarId(); // Gera ID se não existir

  const cliente = {
    id: id, // Inclua o ID no objeto cliente
    nome: document.getElementById("nomeCliente").value,
    cpf: document.getElementById("cpfCliente").value,
    telefone: document.getElementById("telefoneCliente").value,
    email: document.getElementById("emailCliente").value,
    cep: document.getElementById("cepCliente").value,
    logradouro: document.getElementById("enderecoCliente").value,
    numero: document.getElementById("numeroCliente").value,
    complemento: document.getElementById("complementoCliente").value,
    bairro: document.getElementById("bairroCliente").value,
    cidade: document.getElementById("cidadeCliente").value,
    uf: document.getElementById("ufCliente").value,
  };

  if (document.getElementById("clienteId").value) {
    // Atualizar cliente existente
    await fetch(`${API_URL}${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });
  } else {
    // Criar novo cliente
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });
  }

  document.getElementById("formCliente").reset();
  document.getElementById("clienteId").value = "";
  $("#clienteModal").modal("hide"); // Fecha o modal
  carregarClientes();
  location.reload();
}

// Função para atualizar a tabela de clientes
function atualizarTabela(clientes) {
  const tabela = document.getElementById("clienteLista");
  tabela.innerHTML = "";

  clientes.forEach((cliente) => {           
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${cliente.nome}</td>
                    <td>${cliente.cpf}</td>
                    <td>${cliente.telefone}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.logradouro}-${cliente.numero}-${cliente.complemento}-${cliente.bairro}-${cliente.cidade}-${cliente.uf}</td>
                    <td>
                        <button onclick="editarCliente(${cliente.id})" class="btn btn-warning btn-sm">Editar</button>
                        <button onclick="excluirCliente(${cliente.id})" class="btn btn-danger btn-sm">Excluir</button>
                    </td>
                `;
    tabela.appendChild(row);
  });
}

// Função para carregar dados do cliente no formulário para edição
async function editarCliente(id) {
  console.log(id); // Verifique o valor do ID
  const response = await fetch(`${API_URL}${id}`); // Corrige a URL para evitar a barra extra
  const cliente = await response.json();

  document.getElementById("clienteId").value = cliente.id;
  document.getElementById("nomeCliente").value = cliente.nome;
  document.getElementById("cpfCliente").value = cliente.cpf;
  document.getElementById("telefoneCliente").value = cliente.telefone;
  document.getElementById("emailCliente").value = cliente.email;
  document.getElementById("cepCliente").value = cliente.cep;
  document.getElementById("enderecoCliente").value = cliente.logradouro;
  document.getElementById("numeroCliente").value = cliente.numero;
  document.getElementById("complementoCliente").value = cliente.complemento;
  document.getElementById("bairroCliente").value = cliente.bairro;
  document.getElementById("cidadeCliente").value = cliente.cidade;
  document.getElementById("ufCliente").value = cliente.uf;

  $("#clienteModal").modal("show"); // Abre o modal
}

async function excluirCliente(id) {
  if (!id) {
    console.error("ID do cliente inválido:", id);
    alert("ID do cliente não encontrado ou inválido.");
    return;
  }

  const confirmarExclusao = confirm(
    "Tem certeza que deseja excluir este cliente?"
  );

  if (confirmarExclusao) {
    const url = `${API_URL}${id}/`;
    console.log("URL para exclusão:", url);

    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      // Verifique o tipo de resposta da API
      if (response.ok) {
        alert("Cliente excluído com sucesso!");
        carregarClientes(); // Atualiza a lista de clientes
      } else {
        const text = await response.text(); // Obtemos o conteúdo da resposta
        console.error("Erro ao excluir o cliente. Resposta:", text);
        alert("Erro ao excluir o cliente. Confira o console.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na requisição ao servidor.");
    }
  }
}

// Carrega os clientes ao abrir a página
document.addEventListener("DOMContentLoaded", carregarClientes);

$(document).ready(function () {
  $("#cepCliente").on("blur", function () {
    var cep = $(this).val().replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cep.length == 8) {
      // Verifica se o CEP tem 8 dígitos
      $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function (data) {
        console.log(data); // Verifique se os dados estão sendo retornados corretamente
        if (!("erro" in data)) {
          // Preenche os campos com as informações recebidas da API
          $("#enderecoCliente").val(data.logradouro); // Endereço
          $("#bairroCliente").val(data.bairro); // Bairro
          $("#cidadeCliente").val(data.localidade); // Cidade
          $("#ufCliente").val(data.uf); // UF
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
