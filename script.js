document.getElementById("form-contato").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    fetch("http://localhost:3000/enviar-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, email, mensagem })
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("mensagem-confirmação").style.display = "block";
        } else {
            alert("Erro ao enviar a mensagem");
        }
    })
    .catch(error => alert("Erro de conexão com o servidor"));
});
