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
 function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const menu =document.getElementById('menu')
const turmas =document.getElementById('turmas')
const sair =document.getElementById('sair')
const icone = document.querySelectorAll('.icone');
const menutexto = document.querySelectorAll('.menutexto');

menutexto.forEach(function(item, index) {
    item.addEventListener("mouseover", function() {
        for (let i = 0; i <= 200; i++) {
            setTimeout(function(){
                icone[index].style.opacity = i/200;
                
            },10)
            sair.style.left='-5%'
            turmas.style.left='-5%'
            menu.style.left='-10%'
        }
        
        icone[index].style.visibility = 'visible';
        icone[index].style.display = 'block';
    });
    item.addEventListener("mouseleave", function() {
   
        icone[index].style.opacity = '0';
        icone[index].style.visibility = 'hidden';
        icone[index].style.display = 'none';
    });
});