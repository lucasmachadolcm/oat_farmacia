const API_URL = "http://localhost:8000/api/produtos/";

// Função para carregar produtos da API
async function carregarProdutos() {
  const response = await fetch(API_URL);
  const produtos = await response.json();
  atualizarTabela(produtos);
}

function gerarId() {
  return new Date().getTime(); // Gera ID único baseado no tempo
}

// Função para salvar ou atualizar produto
async function salvarProduto() {
  const id = document.getElementById("produtoId").value || gerarId(); // Gera ID se não existir

  const produto = {
    id: id, // Inclua o ID no objeto produto
    nome: document.getElementById("nomeProduto").value,
    descricao: document.getElementById("descricaoProduto").value,
    preco: parseFloat(document.getElementById("precoProduto").value),
    categoria: document.getElementById("categoriaProduto").value,
    quantidade: parseInt(document.getElementById("quantidadeProduto").value),
  };

  if (document.getElementById("produtoId").value) {
    // Atualizar produto existente
    await fetch(`${API_URL}${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    });
  } else {
    // Criar novo produto
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    });
  }

  document.getElementById("formProduto").reset();
  document.getElementById("produtoId").value = "";
  $("#produtoModal").modal("hide"); // Fecha o modal
  carregarProdutos(); 
  location.reload();
}

// Função para atualizar a tabela de produtos
function atualizarTabela(produtos) {
  const tabela = document.getElementById("produtoLista");
  tabela.innerHTML = "";

  produtos.forEach((produto) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${produto.nome}</td>
                    <td>${produto.descricao}</td>
                    <td>R$ ${produto.preco.toFixed(2)}</td>
                    <td>${produto.categoria}</td>
                    <td>${produto.quantidade}</td>
                    <td>
                        <button onclick="editarProduto(${
                          produto.id
                        })" class="btn btn-warning btn-sm">Editar</button>
                        <button onclick="excluirProduto(${
                          produto.id
                        })" class="btn btn-danger btn-sm">Excluir</button>
                    </td>
                `;
    tabela.appendChild(row);
  });
}

// Função para carregar dados do produto no formulário para edição
async function editarProduto(id) {
  const response = await fetch(`${API_URL}${id}`);
  const produto = await response.json();

  document.getElementById("produtoId").value = produto.id;
  document.getElementById("nomeProduto").value = produto.nome;
  document.getElementById("descricaoProduto").value = produto.descricao;
  document.getElementById("precoProduto").value = produto.preco;
  document.getElementById("categoriaProduto").value = produto.categoria;
  document.getElementById("quantidadeProduto").value = produto.quantidade;

  $("#produtoModal").modal("show"); // Abre o modal
}

// Função para excluir um produto
/* async function excluirProduto(id) {
  await fetch(`${API_URL}${id}/`, {
    method: "DELETE",
  });
  carregarProdutos();
} */



// Função para excluir um produto
async function excluirProduto(id) {
  if (!id) {
    console.error("ID do produto inválido:", id);
    alert("ID do produto não encontrado ou inválido.");
    return;
  }

  const confirmarExclusao = confirm(
    "Tem certeza que deseja excluir este produto?"
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
        alert("Produto excluído com sucesso!");
        carregarProdutos(); // Atualiza a lista de produtos
      } else {
        const text = await response.text(); // Obtemos o conteúdo da resposta
        console.error("Erro ao excluir o produto. Resposta:", text);
        alert("Erro ao excluir o produto. Confira o console.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na requisição ao servidor.");
    }
  }
}


// Carrega os produtos ao abrir a página
document.addEventListener("DOMContentLoaded", carregarProdutos);
