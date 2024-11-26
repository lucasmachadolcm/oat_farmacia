// Função para buscar dados da API e popular os campos do formulário
async function carregarDados() {
    try {
        const clienteResponse = await fetch('/api/clientes');
        const produtoResponse = await fetch('/api/produtos');

        if (!clienteResponse.ok || !produtoResponse.ok) {
            throw new Error('Erro ao buscar dados da API');
        }

        const clientes = await clienteResponse.json();
        const produtos = await produtoResponse.json();

        const clienteSelect = document.getElementById("nomeCliente");
        const produtoSelect = document.getElementById("produtoVendido");

        // Preencher o select de clientes
        clientes.forEach(cliente => {
            const option = document.createElement("option");
            option.value = cliente.id;
            option.textContent = cliente.nome;
            clienteSelect.appendChild(option);
        });

        // Preencher o select de produtos
        produtos.forEach(produto => {
            const option = document.createElement("option");
            option.value = produto.id;
            option.textContent = produto.nome;
            produtoSelect.appendChild(option);
        });

    } catch (error) {
        console.error('Erro:', error);
    }
}

// Carregar os dados ao iniciar a página
document.addEventListener("DOMContentLoaded", carregarDados);