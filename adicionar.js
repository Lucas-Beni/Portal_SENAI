const aluno = document.getElementById("alunos")
const turma = document.getElementById("turmas")
const atividade = document.getElementById("atividades")

function aluno1(){
    aluno.innerHTML =  `<div class="inputs">
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
}

function aluno2(){
    aluno.innerHTML = ``
    aluno.style.width = "10vw"
    aluno.style.height = "20vh"
    aluno.style.backgroundImage = "none"
}

alunos.addEventListener('click', aluno1);
alunos.addEventListener('click', turma2)
alunos.addEventListener('click', atividade2)

function turma1(){
    turma.innerHTML =  `<div class="inputs">
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
}

function turma2(){
    turma.innerHTML = ``
    turma.style.width = "10vw"
    turma.style.height = "20vh"
    turma.style.backgroundImage = "none"
}

turma.addEventListener('click', turma1);
turma.addEventListener('click', aluno2);
turma.addEventListener('click', atividade2)

function atividade1(){
    atividade.innerHTML =  `<div class="inputs">
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
    turma.style.left = "50%"
    turma.style.top = "85%"
    turma.style.transition = ".5s"
}

function atividade2(){
    atividade.innerHTML = ``
    atividade.style.width = "10vw"
    atividade.style.height = "20vh"
    atividade.style.backgroundImage = "none"
}

atividade.addEventListener('click', atividade1);
atividade.addEventListener('click', aluno2);
atividade.addEventListener('click', turma2)