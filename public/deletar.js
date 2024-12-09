const turma = document.getElementById("turmas");
const atividade = document.getElementById("atividades");
const disciplina = document.getElementById("disciplinas");


function Load(){
    turma.style.width = "10vw"
    turma.style.height = "20vh"
    turma.style.top = "50%"
    turma.style.left = "25%"
    atividade.style.width = "10vw"
    atividade.style.height = "20vh"
    atividade.style.top = "75%"
    atividade.style.left = "50%"
    disciplina.style.width = "10vw"
    disciplina.style.height = "20vh"
    disciplina.style.top = "50%"
    disciplina.style.left = "75%"
}

turma.addEventListener('click', turmaLarge)
atividade.addEventListener('click', atividadeLarge)
disciplina.addEventListener('click', disciplinaLarge)


function turma1() {
    turma.innerHTML =  `<div class="nome">
                            <p>Turmas</p>
                        </div>
                        <div class="container">
                            <ul id="turma-list" class="turma-list">
                                <!-- As turmas serão inseridas aqui dinamicamente -->
                            </ul>
                            <button id="deletar">Deletar</button>
                        </div>`;
    turma.style.left = "50%";
    turma.style.top = "50%";
    turma.style.backgroundImage = "url('img/fundoLogin.jpg')";
    turma.style.backgroundSize = "cover";
    turma.style.width = "40vw";
    turma.style.height = "55vh";
    turma.style.border=".3vw solid #D9D9D9";
    atividade.style.left = "20%";
    atividade.style.top = "75%";
    disciplina.style.left = "80%";
    disciplina.style.top = "75%";
    turma.removeEventListener('click',turmaLarge)
    carregarTurmas();
    const btnDeletar = document.getElementById('deletar');
    btnDeletar.addEventListener('click', deletarTurma);
}

function turma2() {
    turma.innerHTML = `<p>Turmas</p>`;
    turma.style.width = "10vw";
    turma.style.height = "20vh";
    turma.style.backgroundImage = "none";
    turma.style.border=".3vw solid #B50709"
    turma.addEventListener('click',turmaLarge)
}

function turmaLarge (event){
    if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'SELECT' && event.target.tagName !== 'BUTTON') {
        turma1();
        atividade2();
        disciplina2();
    }
}

// turma.addEventListener('click', (event) => {
//     if (event.target.tagName !== 'INPUT') {
//         turma1();
//         aluno2();
//         atividade2();
//         disciplina2();
//     }
// });

function atividade1() {
    atividade.innerHTML =  `<div class="nome">
                                <p>Atividades</p>
                            </div>
                            <div class="container">
                                <ul id="atividade-list" class="atividade-list">
                                    <!-- As atividades serão inseridas aqui dinamicamente -->
                                </ul>
                                <button id="deletar">Deletar</button>
                            </div>`;
    atividade.style.left = "50%";
    atividade.style.top = "50%";
    atividade.style.backgroundImage = "url('img/fundoLogin.jpg')";
    atividade.style.backgroundSize = "cover";
    atividade.style.width = "40vw";
    atividade.style.height = "55vh";
    atividade.style.border=".3vw solid #D9D9D9";
    turma.style.left = "20%";
    turma.style.top = "75%";
    disciplina.style.left = "80%";
    disciplina.style.top = "75%";
    turma2();
    disciplina2();
    atividade.removeEventListener('click',atividadeLarge)
    carregarAtividades();
    const btnDeletar = document.getElementById('deletar');
    btnDeletar.addEventListener('click', deletarAtividade);
}

function atividade2() {
    atividade.innerHTML = `<p>Atividades</p>`;
    atividade.style.width = "10vw";
    atividade.style.height = "20vh";
    atividade.style.backgroundImage = "none";
    atividade.style.border=".3vw solid #B50709";
    atividade.addEventListener('click',atividadeLarge)
}

function atividadeLarge (event){
    if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'SELECT' && event.target.tagName !== 'BUTTON') {
        atividade1();
        turma2();
        disciplina2();
    }
}

// atividade.addEventListener('click', (event) => {
//     if (event.target.tagName !== 'INPUT') {
//         atividade1();
//         aluno2();
//         turma2();
//         disciplina2();
//     }
// });

function disciplina1() {
    disciplina.innerHTML = `<div class="nome">
                                <p>Disciplinas</p>
                            </div>
                            <div class="container">
                                <ul id="materia-list" class="materia-list">
                                    <!-- As materias serão inseridas aqui dinamicamente -->
                                </ul>
                                <button id="deletar">Deletar</button>
                            </div>`;
    disciplina.style.left = "50%";
    disciplina.style.top = "50%";
    disciplina.style.backgroundImage = "url('img/fundoLogin.jpg')";
    disciplina.style.backgroundSize = "cover";
    disciplina.style.width = "40vw";
    disciplina.style.height = "55vh";
    disciplina.style.border=".3vw solid #D9D9D9";
    turma.style.left = "80%";
    turma.style.top = "75%";
    atividade.style.left = "20%";
    atividade.style.top = "75%";
    disciplina.removeEventListener('click', disciplinaLarge);
    turma2();
    atividade2();
    carregarMaterias();
    const btnDeletar = document.getElementById('deletar');
    btnDeletar.addEventListener('click', deletarMateria);
}

function disciplina2() {
    disciplina.innerHTML = `<p>Disciplinas</p>`;
    disciplina.style.width = "10vw";
    disciplina.style.height = "20vh";
    disciplina.style.backgroundImage = "none";
    disciplina.style.border=".3vw solid #B50709";
    disciplina.addEventListener('click',disciplinaLarge)
}

function disciplinaLarge (event){
    if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'SELECT' && event.target.tagName !== 'BUTTON') {
        disciplina1();
        turma2();
        atividade2();
    }
}

// disciplina.addEventListener('click', (event) => {
//     if (event.target.tagName !== 'INPUT') {
//         disciplina1();
//         aluno2();
//         turma2();
//         atividade2();
//     }
// });