document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio do formulário padrão

    // Coletar os dados do formulário
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simular uma chamada de API para login
    const loginData = {
      email: email,
      password: password,
    };

    console.log("Dados de login:", loginData);

    // Aqui você faria a chamada para sua API, por exemplo:
    /*
    fetch('URL_DA_API_DE_LOGIN', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login falhou!'); // Lida com erros
        }
        return response.json();
    })
    .then(data => {
        // Manipule a resposta da API
        console.log(data);
        if (data.success) {
            // Redirecionar para a página principal ou dashboard
            window.location.href = 'index.html'; // Altere para a página desejada
        } else {
            alert(data.message || 'Erro ao fazer login.');
        }
    })
    .catch((error) => {
        console.error('Erro:', error);
        alert('Houve um problema ao fazer login.'); // Mensagem de erro genérica
    });
    */

    // Mensagem de sucesso (simulação)
    alert("Login realizado com sucesso!"); // Simulação de sucesso
    // Redirecionar para a página principal
    window.location.href = "index.html"; // Altere para a página desejada
  });
