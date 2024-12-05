const aluno = document.getElementById("alunos");
const turma = document.getElementById("turmas");
const atividade = document.getElementById("atividades");
const disciplina = document.getElementById("disciplinas");

// Função para aplicar estilos aos elementos
function applyStyles(element, width, height, top, left, border = "", backgroundImage = "") {
    element.style.width = width;
    element.style.height = height;
    element.style.top = top;
    element.style.left = left;
    element.style.border = border;
    element.style.backgroundImage = backgroundImage;
}

// Função genérica para carregar o conteúdo do formulário
function loadFormContent(element, content, sizeStyles, positionStyles) {
    element.innerHTML = content;
    applyStyles(element, sizeStyles.width, sizeStyles.height, positionStyles.top, positionStyles.left, positionStyles.border, positionStyles.backgroundImage);
}

// Função para gerenciar o recarregamento dos selects
let preventReload = false;

function onSelectChange(event) {
    if (preventReload) {
        event.preventDefault();
        return;
    }
    console.log("Opção selecionada:", event.target.value);
}

function reloadSelect(selectId, options) {
    const selectElement = document.getElementById(selectId);
    preventReload = true;
    selectElement.innerHTML = ''; // Limpa as opções

    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.text;
        selectElement.appendChild(opt);
    });

    preventReload = false;
}

// Função genérica para expandir o formulário
function expandForm(element, contentFunction, otherForms) {
    contentFunction();
    otherForms.forEach(form => form());
}

// Função específica para aluno
function aluno1() {
    loadFormContent(aluno, `<div class="nome"><p>Alunos</p></div>
                            <div class="inputs-1">
                                <label for="nome">Nome</label>
                                <input type="text" id="nome" placeholder="Nome" required>
                                <label for="cpf">CPF</label>
                                <input type="text" id="cpf" placeholder="Ex: 999.999.999-99" required>
                            </div>
                            <div class="inputs-2">
                                <label for="email">E-mail</label>
                                <input type="email" id="email" placeholder="E-mail" required>
                                <label for="telefone">Telefone</label>
                                <input type="tel" id="telefone" placeholder="(xx) xxxxx-xxxx" required>
                            </div>
                            <div class="select-turma">
                                <label for="turma">Turma</label>
                                <select name="turma" id="turma" onchange="onSelectChange(event)">
                                    <!-- Options dynamically populated -->
                                </select>
                                <button type="submit">Confirmar</button>
                            </div>`, 
                            { width: "30vw", height: "45vh" }, { top: "50%", left: "50%", border: ".3vw solid #D9D9D9", backgroundImage: "url('img/fundoLogin.jpg')" });
    reloadSelect("turma", [{ value: '1', text: 'Turma 1' }, { value: '2', text: 'Turma 2' }]);
}

function aluno2() {
    loadFormContent(aluno, `<p>Alunos</p>`, { width: "10vw", height: "20vh" }, { top: "75%", left: "25%", border: ".3vw solid #B50709" });
}

// Função para lidar com o clique no aluno
aluno.addEventListener('click', (event) => {
    if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'SELECT' && event.target.tagName !== 'BUTTON') {
        expandForm(aluno, aluno1, [turma2, atividade2, disciplina2]);
    }
});

// Outras funções específicas para os outros elementos (turma, atividade, disciplina) podem seguir a mesma lógica:

function turma1() {
    loadFormContent(turma, `<div class="nome"><p>Turmas</p></div>
                            <div class="inputs">
                                <label for="nome">Nome</label>
                                <input type="text" id="nome" placeholder="Nome" required>
                            </div>
                            <div class="select-periodo">
                                <label for="periodo">Período</label>
                                <select name="periodo" id="periodo">
                                    <option value="Matutino">Matutino</option>
                                    <option value="Vespertino">Vespertino</option>
                                    <option value="Noturno">Noturno</option>
                                </select>
                            </div>
                            <button type="submit">Confirmar</button>`,
                            { width: "30vw", height: "45vh" }, { top: "50%", left: "50%", border: ".3vw solid #D9D9D9", backgroundImage: "url('img/fundoLogin.jpg')" });
}

function turma2() {
    loadFormContent(turma, `<p>Turmas</p>`, { width: "10vw", height: "20vh" }, { top: "75%", left: "25%", border: ".3vw solid #B50709" });
}

function atividade1() {
    loadFormContent(atividade, `<div class="nome"><p>Atividades</p></div>
                                <div class="inputs-1">
                                    <label for="nome">Nome</label>
                                    <input type="text" id="nome" placeholder="Nome" required>
                                    <label for="turma">Turma</label>
                                    <select name="turma" id="turma">
                                    </select>
                                </div>
                                <div class="inputs-2">
                                    <label for="materia">Matéria</label>
                                    <select name="materia" id="materia">
                                    </select>
                                    <label for="semestre">Semestre</label>
                                    <select name="semestre" id="semestre">
                                        <option value="1">Primeiro</option>
                                        <option value="2">Segundo</option>
                                        <option value="3">Terceiro</option>
                                    </select>
                                </div>
                                <div class="descricao">
                                    <label for="descricao">Descrição</label>
                                    <input type="text" name="descricao" id="descricao">
                                <button type="submit">Confirmar</button>`,
                                { width: "30vw", height: "45vh" }, { top: "50%", left: "50%", border: ".3vw solid #D9D9D9", backgroundImage: "url('img/fundoLogin.jpg')" });
}

function atividade2() {
    loadFormContent(atividade, `<p>Atividades</p>`, { width: "10vw", height: "20vh" }, { top: "75%", left: "50%", border: ".3vw solid #B50709" });
}

function disciplina1() {
    loadFormContent(disciplina, `<div class="nome"><p>Disciplinas</p></div>
                                <div class="inputs">
                                    <label for="nome">Nome</label>
                                    <input type="text" id="nome" placeholder="Nome" required>
                                </div>
                                <button type="submit">Confirmar</button>`,
                                { width: "30vw", height: "45vh" }, { top: "50%", left: "50%", border: ".3vw solid #D9D9D9", backgroundImage: "url('img/fundoLogin.jpg')" });
}

function disciplina2() {
    loadFormContent(disciplina, `<p>Disciplinas</p>`, { width: "10vw", height: "20vh" }, { top: "75%", left: "75%", border: ".3vw solid #B50709" });
}

// Função para lidar com o clique no atividade
atividade.addEventListener('click', (event) => {
    if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'SELECT' && event.target.tagName !== 'BUTTON') {
        expandForm(atividade, atividade1, [aluno2, turma2, disciplina2]);
    }
});

// Função para lidar com o clique no disciplina
disciplina.addEventListener('click', (event) => {
    if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'SELECT' && event.target.tagName !== 'BUTTON') {
        expandForm(disciplina, disciplina1, [aluno2, turma2, atividade2]);
    }
});
