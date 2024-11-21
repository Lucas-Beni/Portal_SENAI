const aluno = document.getElementById("alunos")
const turma = document.getElementById("turmas")
const atividade = document.getElementById("atividades")
const disciplina = document.getElementById("disciplinas")

function aluno1(){
    aluno.innerHTML =  `<div class="nome">
                            <p>Alunos</p>
                        </div>
                        <div class="inputs">
                            <input type="text" placeholder="Usuário">
                            <input type="password" placeholder="Senha">
                            <input type="email" placeholder="E-mail">
                        </div>`
    aluno.style.left = "50%"
    aluno.style.top = "50%"
    aluno.style.backgroundImage = "url('img/fundoLogin.jpg')"
    aluno.style. backgroundSize = "cover"
    aluno.style.width = "30vw"
    aluno.style.height = "45vh"
    aluno.style.transition = ".5s"
    turma.style.left = "25%"
    turma.style.top = "75%"
    turma.style.transition = ".5s"
    atividade.style.left = "50%"
    atividade.style.top = "85%"
    atividade.style.transition = ".5s"
    disciplina.style.left = "75%"
    disciplina.style.top = "75%"
    disciplina.style.transition = ".5s"
}

function aluno2(){
    aluno.innerHTML = `<p>Alunos</p>`
    aluno.style.width = "10vw"
    aluno.style.height = "20vh"
    aluno.style.backgroundImage = "none"
}

alunos.addEventListener('click', aluno1);
alunos.addEventListener('click', turma2)
alunos.addEventListener('click', atividade2)
alunos.addEventListener('click', disciplina2);

function turma1(){
    turma.innerHTML =  `<div class="nome">
                            <p>Turmas</p>
                        </div>
                        <div class="inputs">
                            <input type="text" placeholder="Usuário">
                            <input type="password" placeholder="Senha">
                            <input type="email" placeholder="E-mail">
                        </div>`
    turma.style.left = "50%"
    turma.style.top = "50%"
    turma.style.backgroundImage = "url('img/fundoLogin.jpg')"
    turma.style. backgroundSize = "cover"
    turma.style.width = "30vw"
    turma.style.height = "45vh"
    turma.style.transition = ".5s"
    aluno.style.left = "25%"
    aluno.style.top = "75%"
    aluno.style.transition = ".5s"
    atividade.style.left = "50%"
    atividade.style.top = "85%"
    atividade.style.transition = ".5s"
    disciplina.style.left = "75%"
    disciplina.style.top = "75%"
    disciplina.style.transition = ".5s"
}

function turma2(){
    turma.innerHTML = `<p>Turmas</p>`
    turma.style.width = "10vw"
    turma.style.height = "20vh"
    turma.style.backgroundImage = "none"
}

turma.addEventListener('click', turma1);
turma.addEventListener('click', aluno2);
turma.addEventListener('click', atividade2)
turma.addEventListener('click', disciplina2);

function atividade1(){
    atividade.innerHTML = `<div class="nome">
                            <p>Atividades</p>
                        </div>
                        <div class="inputs">
                            <input type="text" placeholder="Usuário">
                            <input type="password" placeholder="Senha">
                            <input type="email" placeholder="E-mail">
                        </div>`
    atividade.style.left = "50%"
    atividade.style.top = "50%"
    atividade.style.backgroundImage = "url('img/fundoLogin.jpg')"
    atividade.style. backgroundSize = "cover"
    atividade.style.width = "30vw"
    atividade.style.height = "45vh"
    atividade.style.transition = ".5s"
    aluno.style.left = "25%"
    aluno.style.top = "75%"
    aluno.style.transition = ".5s"
    turma.style.left = "75%"
    turma.style.top = "75%"
    turma.style.transition = ".5s"
    disciplina.style.left = "50%"
    disciplina.style.top = "85%"
    disciplina.style.transition = ".5s"
}

function atividade2(){
    atividade.innerHTML = `<p>Atividades</p>`
    atividade.style.width = "10vw"
    atividade.style.height = "20vh"
    atividade.style.backgroundImage = "none"
}

atividade.addEventListener('click', atividade1);
atividade.addEventListener('click', aluno2);
atividade.addEventListener('click', turma2);
atividade.addEventListener('click', disciplina2);

function disciplina1(){
    disciplina.innerHTML = `<div class="nome">
                                <p>Disciplinas</p>
                            </div>
                            <div class="inputs">
                                <input type="text" placeholder="Usuário">
                                <input type="password" placeholder="Senha">
                                <input type="email" placeholder="E-mail">
                            </div>`
    disciplina.style.left = "50%"
    disciplina.style.top = "50%"
    disciplina.style.backgroundImage = "url('img/fundoLogin.jpg')"
    disciplina.style. backgroundSize = "cover"
    disciplina.style.width = "30vw"
    disciplina.style.height = "45vh"
    disciplina.style.transition = ".5s"
    aluno.style.left = "25%"
    aluno.style.top = "75%"
    aluno.style.transition = ".5s"
    turma.style.left = "75%"
    turma.style.top = "75%"
    turma.style.transition = ".5s"
    atividade.style.left = "50%"
    atividade.style.top = "85%"
    atividade.style.transition = ".5s"
}

function disciplina2(){
    disciplina.innerHTML = `<p>Disciplinas</p>`
    disciplina.style.width = "10vw"
    disciplina.style.height = "20vh"
    disciplina.style.backgroundImage = "none"
}

disciplina.addEventListener('click', disciplina1);
disciplina.addEventListener('click', aluno2);
disciplina.addEventListener('click', turma2);
disciplina.addEventListener('click', atividade2);