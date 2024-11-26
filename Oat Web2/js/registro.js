document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio do formulário tradicional

    // Coletar os dados do formulário
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validar se as senhas coincidem
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    // Simular uma chamada de API para registro
    // Aqui você substituiria isso pela sua lógica de chamada API real
    const registrationData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    console.log("Dados do registro:", registrationData);
    // Aqui você faria a chamada para sua API, por exemplo:
    /*
    fetch('URL_DA_API', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
    })
    .then(response => response.json())
    .then(data => {
        // Manipule a resposta da API
        console.log(data);
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
    */

    alert("Conta registrada com sucesso!"); // Mensagem de sucesso (simulação)
    // Redirecionar para a página de login ou outra ação após o registro
    window.location.href = "login.html"; // Redireciona para a página de login
  });
