// Obtém o elemento da letra
const letraElement = document.getElementById('letra');

// Define as opções de troca
const letras = [
    { letra: 'P', cor: 'letra-p' },
    { letra: 'F', cor: 'letra-f' },
    { letra: 'D', cor: 'letra-d' }
];

let estadoAtual = 0; // Começa com a letra P (índice 0)

// Função que altera a letra e a cor
function trocarLetra() {
    // Remove a classe atual de cor
    letraElement.classList.remove(letras[estadoAtual].cor);

    // Avança para a próxima letra (com loop)
    estadoAtual = (estadoAtual + 1) % letras.length;

    // Atualiza o texto e a classe de cor
    letraElement.textContent = letras[estadoAtual].letra;
    letraElement.classList.add(letras[estadoAtual].cor);
}

// Adiciona o evento de clique para trocar a letra
letraElement.addEventListener('click', trocarLetra);
