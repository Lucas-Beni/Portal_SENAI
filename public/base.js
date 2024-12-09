document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById("menu");
    const sideMenu = document.getElementById("sideMenu");
    const closeMenu = document.getElementById("closeMenu");
    const icone = document.querySelectorAll('.icone');
    const menutexto = document.querySelectorAll('.menutexto');
    
    // Abre ou fecha o menu ao clicar no ícone do menu
    menuIcon.addEventListener("click", () => {
        sideMenu.classList.toggle("open");
    });

    // Fecha o menu ao clicar no botão de fechamento
    closeMenu.addEventListener("click", () => {
        sideMenu.classList.remove("open");
    });
    
    // Para os ícones no hover
    menutexto.forEach(function(item, index) {
        item.addEventListener("mouseover", function() {
            // Ajusta a opacidade e visibilidade do ícone
            icone[index].style.opacity = 1;
            icone[index].style.visibility = 'visible';
            icone[index].style.display = 'block';

            // Ajusta a posição dos textos
            sair.style.left = '-5%';
            turmas2.style.left = '-5%';
            menu.style.left = '-10%';
        });

        item.addEventListener("mouseleave", function() {
            // Restaura a opacidade e visibilidade do ícone
            icone[index].style.opacity = 0;
            icone[index].style.visibility = 'hidden';
            icone[index].style.display = 'none';
        });
    });
});