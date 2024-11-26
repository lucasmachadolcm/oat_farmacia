const API_URL = "http://localhost:8000/api/convenios/";

// Função para carregar convênios da API
async function carregarConvenios() {
  const response = await fetch(API_URL);
  const convenios = await response.json();
  atualizarTabela(convenios);
}

function gerarId() {
  return new Date().getTime(); // Gera ID único baseado no tempo
}

async function salvarConvenio() {
  const id = document.getElementById("convenioId").value || gerarId();

  const convenio = {
    id: id,
    nome: document.getElementById("nomeConvenio").value,
    cnpj: document.getElementById("cnpjConvenio").value,
    telefone: document.getElementById("telefoneConvenio").value,
    email: document.getElementById("emailConvenio").value,
    cep: document.getElementById("cepConvenio").value,
    logradouro: document.getElementById("enderecoConvenio").value,
    numero: document.getElementById("numeroConvenio").value,
    complemento: document.getElementById("complementoConvenio").value,
    bairro: document.getElementById("bairroConvenio").value,
    cidade: document.getElementById("cidadeConvenio").value,
    uf: document.getElementById("ufConvenio").value,
    desconto: parseFloat(document.getElementById("desconto").value), // Corrigido para número
    data_validade: document.getElementById("validade").value, // Corrigido para nome correto
  };

  try {
    if (document.getElementById("convenioId").value) {
      // Atualizar o convênio existente
      const response = await fetch(`${API_URL}${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convenio),
      });

      if (response.ok) {
        alert("Convênio atualizado com sucesso!");
      } else {
        const errorText = await response.text();
        console.error("Erro ao atualizar o convênio:", errorText);
      }
    } else {
      // Criar um novo convênio
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convenio),
      });

      if (response.ok) {
        alert("Convênio criado com sucesso!");
      } else {
        const errorText = await response.text();
        console.error("Erro ao criar o convênio:", errorText);
      }
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Ocorreu um erro ao salvar o convênio.");
  }

  // Limpar o formulário e atualizar a lista
  document.getElementById("formConvenio").reset();
  document.getElementById("convenioId").value = "";
  $("#convenioModal").modal("hide");
  carregarConvenios();
  location.reload();
}

// Função para atualizar a tabela de convênios
function atualizarTabela(convenios) {
  const tabela = document.getElementById("convenioLista");
  tabela.innerHTML = "";

  convenios.forEach((convenio) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${convenio.nome}</td>
                    <td>${convenio.cnpj}</td>
                    <td>${convenio.telefone}</td>
                    <td>${convenio.email}</td>
                    <td>${convenio.logradouro}-${convenio.numero}-${convenio.complemento}-${convenio.bairro}-${convenio.cidade}-${convenio.uf}</td>
                    <td>${convenio.desconto}</td>
                    <td>${convenio.data_validade}</td>
                    <td>
                        <button onclick="editarConvenio(${convenio.id})" class="btn btn-warning btn-sm">Editar</button>
                        <button onclick="excluirConvenio(${convenio.id})" class="btn btn-danger btn-sm">Excluir</button>
                    </td>
                `;
    tabela.appendChild(row);
  });
}

// Função para carregar dados do convênio no formulário para edição
async function editarConvenio(id) {
  const response = await fetch(`${API_URL}${id}`);
  const convenio = await response.json();

  document.getElementById("convenioId").value = convenio.id;
  document.getElementById("nomeConvenio").value = convenio.nome;
  document.getElementById("cnpjConvenio").value = convenio.cnpj;
  document.getElementById("telefoneConvenio").value = convenio.telefone;
  document.getElementById("emailConvenio").value = convenio.email;
  document.getElementById("cepConvenio").value = convenio.cep;
  document.getElementById("enderecoConvenio").value = convenio.logradouro;
  document.getElementById("numeroConvenio").value = convenio.numero;
  document.getElementById("complementoConvenio").value = convenio.complemento;
  document.getElementById("bairroConvenio").value = convenio.bairro;
  document.getElementById("cidadeConvenio").value = convenio.cidade;
  document.getElementById("ufConvenio").value = convenio.uf;
  document.getElementById("desconto").value = convenio.desconto;
  document.getElementById("validade").value = convenio.data_validade;

  $("#convenioModal").modal("show"); // Abre o modal
}

// Função para excluir um convênio
async function excluirConvenio(id) {
  await fetch(`${API_URL}${id}/`, {
    method: "DELETE",
  });
  carregarConvenios();
}

// Carrega os convênios ao abrir a página
document.addEventListener("DOMContentLoaded", carregarConvenios);

$(document).ready(function () {
  $("#cepConvenio").on("blur", function () {
    var cep = $(this).val().replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cep.length == 8) {
      // Verifica se o CEP tem 8 dígitos
      $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function (data) {
        console.log(data); // Verifique se os dados estão sendo retornados corretamente
        if (!("erro" in data)) {
          // Preenche os campos com as informações recebidas da API
          $("#enderecoConvenio").val(data.logradouro); // Endereço
          $("#bairroConvenio").val(data.bairro); // Bairro
          $("#cidadeConvenio").val(data.localidade); // Cidade
          $("#ufConvenio").val(data.uf); // UF
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
