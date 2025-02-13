document.getElementById("form-contato").addEventListener("submit", function(event) {
    event.preventDefault();

    document.getElementById("mensagem-confirmacao").style.display = "block";

    setTimeout(() => {
        document.getElementById("mensagem-cofirmacao").style.display = "none";
        document.getElementById("form-contato").reset();
    }, 3000);
});