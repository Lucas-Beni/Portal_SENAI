document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById("menu");
    const sideMenu = document.getElementById("sideMenu");
    const closeMenu = document.getElementById("closeMenu");

    // Abre ou fecha o menu ao clicar no ícone do menu
    menuIcon.addEventListener("click", () => {
        sideMenu.classList.toggle("open");
    });

    // Fecha o menu ao clicar no botão de fechamento
    closeMenu.addEventListener("click", () => {
        sideMenu.classList.remove("open");
    });
});



 // Foi usado o mesmo principio da fiora, na parte de abrir e fechar o menu