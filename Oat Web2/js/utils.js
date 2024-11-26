function mascaraCPF(cpf) {
  let v = cpf.value.replace(/\D/g, ""); // Remove caracteres não numéricos
  if (v.length > 3) v = v.replace(/(\d{3})(\d)/, "$1.$2");
  if (v.length > 6) v = v.replace(/(\d{3})(\d)/, "$1.$2");
  if (v.length > 9) v = v.replace(/(\d{3})(\d{2})$/, "$1-$2");
  cpf.value = v;
}

function mascaraTelefone(tel) {
  let v = tel.value.replace(/\D/g, ""); // Remove caracteres não numéricos
  if (v.length > 0) v = v.replace(/^(\d{2})(\d)/, "($1) $2");
  if (v.length > 6) v = v.replace(/(\d{5})(\d)/, "$1-$2");
  tel.value = v;
}

function mascaraCEP(cep) {
  let v = cep.value.replace(/\D/g, ""); // Remove caracteres não numéricos
  if (v.length > 5) v = v.replace(/(\d{5})(\d)/, "$1-$2");
  cep.value = v;
}

function validarEmail(email) {
  // Expressão regular para validar o formato básico de um e-mail
  var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (regex.test(email.value)) {
    email.style.borderColor = "green";
  } else {
    email.style.borderColor = "red";
  }
}

function mascaraCNPJ(cnpj) {
  let v = cnpj.value.replace(/\D/g, ""); // Remove tudo que não for número

  // Aplica a máscara do CNPJ
  if (v.length > 2) v = v.replace(/^(\d{2})(\d)/, "$1.$2");
  if (v.length > 5) v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  if (v.length > 8)
    v = v.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4");
  if (v.length > 12)
    v = v.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5");

  cnpj.value = v;

  // Chama a validação do CNPJ
  validarCNPJ(cnpj);
}

function validarCNPJ(cnpj) {
  // Remove caracteres não numéricos
  let v = cnpj.value.replace(/\D/g, "");

  // Verifica se o CNPJ tem 14 dígitos
  if (v.length === 14) {
    // Validação do CNPJ (usando o algoritmo de validação do CNPJ)
    if (!validarCNPJAlgo(v)) {
      cnpj.style.borderColor = "red"; // Se inválido, muda a borda para vermelho
    } else {
      cnpj.style.borderColor = "green"; // Se válido, muda a borda para verde
    }
  } else {
    cnpj.style.borderColor = ""; // Se não tiver 14 dígitos, não muda a cor da borda
  }
}

function validarCNPJAlgo(cnpj) {
  let soma = 0;
  let resto;
  let digito;
  let cnpjAux = cnpj.substring(0, 12);
  let digitos = cnpj.substring(12);

  // Validação do primeiro dígito
  soma = 0;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpjAux.charAt(i)) * (13 - i);
  }
  resto = soma % 11;
  digito = resto < 2 ? 0 : 11 - resto;
  if (digito !== parseInt(digitos.charAt(0))) return false;

  // Validação do segundo dígito
  soma = 0;
  cnpjAux = cnpjAux + digito;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpjAux.charAt(i)) * (14 - i);
  }
  resto = soma % 11;
  digito = resto < 2 ? 0 : 11 - resto;
  if (digito !== parseInt(digitos.charAt(1))) return false;

  return true;
}

function exportarTabelaPDF(tabelaId) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Adiciona título ao PDF
  doc.text("Tabela Exportada", 14, 10);

  // Seleciona a tabela e extrai dados do cabeçalho e das linhas
  const tabela = document.getElementById(tabelaId);
  const data = [];
  const header = [];

  // Captura o cabeçalho (th)
  const headerCells = tabela.querySelectorAll("thead th");
  headerCells.forEach((cell) => header.push(cell.innerText));

  // Captura as linhas da tabela (td)
  const rows = tabela.querySelectorAll("tbody tr");
  rows.forEach((row) => {
      const rowData = [];
      const cells = row.querySelectorAll("td");
      cells.forEach((cell) => rowData.push(cell.innerText));
      data.push(rowData);
  });

  // Ajuste das larguras das colunas para que se ajustem à página
  const columnStyles = header.map((_, index) => ({
      cellWidth: 'auto'  // Isso faz com que as colunas sejam ajustadas automaticamente
  }));

  // Gera a tabela no PDF usando autoTable
  doc.autoTable({
      head: [header],      // Define o cabeçalho da tabela
      body: data,         // Define os dados da tabela
      startY: 20,         // Posiciona a tabela no PDF
      columnStyles: columnStyles, // Ajusta a largura das colunas automaticamente
      margin: { top: 20, bottom: 20 }, // Margem para garantir que a tabela não sobreponha o conteúdo
  });

  // Baixa o PDF com o nome do ID da tabela
  doc.save(`${tabelaId}.pdf`);
}



function exportarTabelaExcel(tabelaId) {
  // Seleciona a tabela pelo ID
  const tabela = document.querySelector(`#${tabelaId}`).closest("table");

  // Cria um workbook e converte a tabela em uma planilha
  const workbook = XLSX.utils.table_to_book(tabela, { sheet: "Sheet1" });
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Cria um blob e baixa o arquivo Excel
  const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${tabelaId}.xlsx`;
  link.click();
}
