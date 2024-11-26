$(document).ready(function () {
  $("#salvarBtn").click(function (e) {
    e.preventDefault(); // Impede o envio do formulário antes da validação

    // Seleciona todos os inputs obrigatórios
    let camposVazios = false;
    $("#formFuncionario input[required]").each(function () {
      if ($(this).val().trim() === "") {
        camposVazios = true;
        $(this).addClass("erro"); // Adiciona uma classe para estilizar os campos com erro
      } else {
        $(this).removeClass("erro"); // Remove a classe caso o campo seja preenchido
      }
    });

    if (camposVazios) {
      alert("Por favor, preencha todos os campos obrigatórios!");
    } else {
      // Chama a função de salvar ou enviar o formulário
      salvarFuncionario();
    }
  });
});

$(document).ready(function () {
  $("#salvarBtnConvenio").click(function (e) {
    e.preventDefault(); // Impede o envio do formulário antes da validação

    // Seleciona todos os inputs obrigatórios
    let camposVazios = false;
    $("#formConvenio input[required]").each(function () {
      if ($(this).val().trim() === "") {
        camposVazios = true;
        $(this).addClass("erro"); // Adiciona uma classe para estilizar os campos com erro
      } else {
        $(this).removeClass("erro"); // Remove a classe caso o campo seja preenchido
      }
    });

    if (camposVazios) {
      alert("Por favor, preencha todos os campos obrigatórios!");
    } else {
      // Chama a função de salvar ou enviar o formulário
      salvarConvenio();
    }
  });
});

$(document).ready(function () {
  $("#salvarBtnCliente").click(function (e) {
    e.preventDefault(); // Impede o envio do formulário antes da validação

    // Seleciona todos os inputs obrigatórios
    let camposVazios = false;
    $("#formCliente input[required]").each(function () {
      if ($(this).val().trim() === "") {
        camposVazios = true;
        $(this).addClass("erro"); // Adiciona uma classe para estilizar os campos com erro
      } else {
        $(this).removeClass("erro"); // Remove a classe caso o campo seja preenchido
      }
    });

    if (camposVazios) {
      alert("Por favor, preencha todos os campos obrigatórios!");
    } else {
      // Chama a função de salvar ou enviar o formulário
      salvarCliente();
    }
  });
});

$(document).ready(function () {
  $("#salvarBtnProduto").click(function (e) {
    e.preventDefault(); // Impede o envio do formulário antes da validação

    // Seleciona todos os inputs obrigatórios
    let camposVazios = false;
    $("#formProduto input[required]").each(function () {
      if ($(this).val().trim() === "") {
        camposVazios = true;
        $(this).addClass("erro"); // Adiciona uma classe para estilizar os campos com erro
      } else {
        $(this).removeClass("erro"); // Remove a classe caso o campo seja preenchido
      }
    });

    if (camposVazios) {
      alert("Por favor, preencha todos os campos obrigatórios!");
    } else {
      // Chama a função de salvar ou enviar o formulário
      salvarProduto();
    }
  });
});

$(document).ready(function () {
  $("#salvarBtnFornecedor").click(function (e) {
    e.preventDefault(); // Impede o envio do formulário antes da validação

    // Seleciona todos os inputs obrigatórios
    let camposVazios = false;
    $("#formFornecedor input[required]").each(function () {
      if ($(this).val().trim() === "") {
        camposVazios = true;
        $(this).addClass("erro"); // Adiciona uma classe para estilizar os campos com erro
      } else {
        $(this).removeClass("erro"); // Remove a classe caso o campo seja preenchido
      }
    });

    if (camposVazios) {
      alert("Por favor, preencha todos os campos obrigatórios!");
    } else {
      // Chama a função de salvar ou enviar o formulário
      salvarFornecedor();
    }
  });
});

$(document).ready(function () {
  $("#salvarBtnReceita").click(function (e) {
    e.preventDefault(); // Impede o envio do formulário antes da validação

    // Seleciona todos os inputs obrigatórios
    let camposVazios = false;
    $("#formReceita input[required]").each(function () {
      if ($(this).val().trim() === "") {
        camposVazios = true;
        $(this).addClass("erro"); // Adiciona uma classe para estilizar os campos com erro
      } else {
        $(this).removeClass("erro"); // Remove a classe caso o campo seja preenchido
      }
    });

    if (camposVazios) {
      alert("Por favor, preencha todos os campos obrigatórios!");
    } else {
      // Chama a função de salvar ou enviar o formulário
      salvarReceita();
    }
  });
});
