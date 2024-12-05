// Definição de dois usuários
const user1 = { username: "admin", password: "admin123", email: "admin@example.com" };
const user2 = { username: "user1", password: "user123", email: "user1@example.com" };

document.getElementById("loginBtn").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const email = document.getElementById("email").value.trim();

    // Validação de campos vazios
    if (!username || !password || !email) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Verifica as credenciais do primeiro usuário
    if (username === user1.username && password === user1.password && email === user1.email) {
        sessionStorage.setItem("currentUser", JSON.stringify(user1));
        window.location.href = "paginainicial.html";
    }
    // Verifica as credenciais do segundo usuário
    else if (username === user2.username && password === user2.password && email === user2.email) {
        sessionStorage.setItem("currentUser", JSON.stringify(user2));
        window.location.href = "paginainicial.html";
    }
    // Caso as credenciais estejam erradas
    else {
        alert("Usuário, senha ou email incorretos.");
    }
});



