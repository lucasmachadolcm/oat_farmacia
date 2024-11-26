document.getElementById('resetPasswordForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obter o e-mail digitado pelo usuário
    const email = document.getElementById('email').value;

    // Preparar os dados para a chamada de API
    const resetData = {
        email: email
    };

    console.log('Solicitando redefinição de senha para:', resetData);

    // Simulação de chamada para a API
    /*
    fetch('URL_DA_API_DE_RESET_SENHA', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resetData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao solicitar redefinição de senha.');
        }
        return response.json();
    })
    .then(data => {
        // Manipule a resposta da API
        console.log(data);
        if (data.success) {
            alert('Um link de redefinição de senha foi enviado para o seu e-mail.');
            // Redirecionar para a página de login ou outra página relevante
            window.location.href = 'login.html';
        } else {
            alert(data.message || 'Erro ao solicitar redefinição de senha.');
        }
    })
    .catch((error) => {
        console.error('Erro:', error);
        alert('Ocorreu um problema ao solicitar a redefinição de senha.');
    });
    */

    // Simulação de sucesso
    alert('Um link de redefinição de senha foi enviado para o seu e-mail.');
    // Redirecionar para a página de login
    window.location.href = 'login.html';
});