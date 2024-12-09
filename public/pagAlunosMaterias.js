async function exibirAlunos() {
    const alunoSelecionado = document.getElementById('abaA');
    const materiaNone = document.getElementById('abaM');
    alunoSelecionado.style.borderWidth = ".15vw";
    alunoSelecionado.style.borderStyle = "solid";
    alunoSelecionado.style.borderColor = "#000";
    materiaNone.style.borderWidth = "0"

    const container = document.getElementById('containerAlunos');
    container.innerHTML = '';
    if (!container) {
        alert("Elemento 'containerTurmas' não encontrado no DOM");
        return;
    }

    const nome = document.createElement('div');
    container.appendChild(nome);
    nome.textContent = 'Nome';
    nome.style.height = "8vh";
    nome.style.width = "15vw";
    nome.style.fontFamily = "Inter, sans-serif";
    nome.style.fontSize = "2.5vh";
    nome.style.fontWeight = "bold";
    nome.style.borderWidth = "0 .1vw .1vw 0";
    nome.style.borderStyle = "solid";
    nome.style.borderColor = "#c7c7c7";
    nome.style.position = "absolute";
    nome.style.display = "flex";
    nome.style.justifyContent = "center";
    nome.style.alignItems = "center";

    const cpf = document.createElement('div');
    container.appendChild(cpf);
    cpf.textContent = 'CPF';
    cpf.style.height = "8vh";
    cpf.style.width = "15vw";
    cpf.style.fontFamily = "Inter, sans-serif";
    cpf.style.fontSize = "2.5vh";
    cpf.style.fontWeight = "bold";
    cpf.style.borderWidth = "0 .1vw .1vw 0";
    cpf.style.borderStyle = "solid";
    cpf.style.borderColor = "#c7c7c7";
    cpf.style.position = "absolute";
    cpf.style.left = "15vw";
    cpf.style.display = "flex";
    cpf.style.justifyContent = "center";
    cpf.style.alignItems = "center";

    const email = document.createElement('div');
    container.appendChild(email);
    email.textContent = 'E-mail';
    email.style.height = "8vh";
    email.style.width = "15vw";
    email.style.fontFamily = "Inter, sans-serif";
    email.style.fontSize = "2.5vh";
    email.style.fontWeight = "bold";
    email.style.borderWidth = "0 .1vw .1vw 0";
    email.style.borderStyle = "solid";
    email.style.borderColor = "#c7c7c7";
    email.style.position = "absolute";
    email.style.left = "30vw";
    email.style.display = "flex";
    email.style.justifyContent = "center";
    email.style.alignItems = "center";

    const telefone = document.createElement('div')
    container.appendChild(telefone);
    telefone.textContent = 'Telefone';
    telefone.style.height = "8vh";
    telefone.style.width = "15vw";
    telefone.style.fontFamily = "Inter, sans-serif";
    telefone.style.fontSize = "2.5vh";
    telefone.style.fontWeight = "bold";
    telefone.style.borderWidth = "0 0 .1vw 0";
    telefone.style.borderStyle = "solid";
    telefone.style.borderColor = "#c7c7c7";
    telefone.style.position = "absolute";
    telefone.style.left = "45vw";
    telefone.style.display = "flex";
    telefone.style.justifyContent = "center";
    telefone.style.alignItems = "center";

    try {
        const turmaID = document.getElementById('turmaID').textContent; // Supondo que você tenha um elemento com id 'turmaID'
        const resposta = await fetch(`http://localhost:3000/carregarAlunos?turmaID=${turmaID}`);
        if(resposta.ok) {
            const alunosTurma = await resposta.json();

            alunosTurma.forEach(alunoT => {
                const containerInfo = document.createElement('div');
                const nomeDiv = document.createElement('div');
                const cpfDiv = document.createElement('div');
                const emailDiv = document.createElement('div');  
                const telefoneDiv = document.createElement('div');
                container.appendChild(containerInfo);
                containerInfo.appendChild(nomeDiv);
                containerInfo.appendChild(cpfDiv);
                containerInfo.appendChild(emailDiv);
                containerInfo.appendChild(telefoneDiv);

                containerInfo.style.fontSize = "2vh";
                containerInfo.style.fontFamily = "Inter, sans-serif";
                containerInfo.style.width = "60vw";
                containerInfo.style.display = "flex";
                containerInfo.style.flexDirection = "row";
                containerInfo.style.position = "relative";
                containerInfo.style.top = "8vh";

                nomeDiv.textContent = alunoT.nomeAluno;
                nomeDiv.style.height = "6vh";
                nomeDiv.style.width = "30vw";
                nomeDiv.style.backgroundColor = "#e4e4e4";
                nomeDiv.style.borderWidth = "0 .1vw .1vw 0";
                nomeDiv.style.borderStyle = "solid";
                nomeDiv.style.borderColor = "#c7c7c7";
                nomeDiv.style.display = "flex";
                nomeDiv.style.justifyContent ="center";
                nomeDiv.style.alignItems = "center";

                cpfDiv.textContent = alunoT.cpAluno;
                cpfDiv.style.height = "6vh";
                cpfDiv.style.width = "30vw";
                cpfDiv.style.backgroundColor = "#e4e4e4";
                cpfDiv.style.borderWidth = "0 .1vw .1vw 0";
                cpfDiv.style.borderStyle = "solid";
                cpfDiv.style.borderColor = "#c7c7c7";
                cpfDiv.style.display = "flex";
                cpfDiv.style.justifyContent ="center";
                cpfDiv.style.alignItems = "center";

                emailDiv.textContent = alunoT.emailAluno;
                emailDiv.style.height = "6vh";
                emailDiv.style.width = "30vw";
                emailDiv.style.backgroundColor = "#e4e4e4";
                emailDiv.style.borderWidth = "0 .1vw .1vw 0";
                emailDiv.style.borderStyle = "solid";
                emailDiv.style.borderColor = "#c7c7c7";
                emailDiv.style.display = "flex";
                emailDiv.style.justifyContent ="center";
                emailDiv.style.alignItems = "center";

                telefoneDiv.textContent = alunoT.telefoneAluno;
                telefoneDiv.style.height = "6vh";
                telefoneDiv.style.width = "30vw";
                telefoneDiv.style.backgroundColor = "#e4e4e4";
                telefoneDiv.style.borderWidth = "0 0 .1vw  0";
                telefoneDiv.style.borderStyle = "solid";
                telefoneDiv.style.borderColor = "#c7c7c7";
                telefoneDiv.style.display = "flex";
                telefoneDiv.style.justifyContent ="center";
                telefoneDiv.style.alignItems = "center";
            });
        } else {
            alert('Ta fraco ein chefe')
        }
    } catch(error) {
        console.error("Erro ao encontrar alunos", error)
    }
}

async function exibirMaterias() {
    const materiaSelecionado = document.getElementById('abaM');
    const alunoNone = document.getElementById('abaA');
    materiaSelecionado.style.borderWidth = ".15vw";
    materiaSelecionado.style.borderStyle = "solid";
    materiaSelecionado.style.borderColor = "#000";
    alunoNone.style.borderWidth = "0"

    const container = document.getElementById('containerAlunos');
    container.innerHTML = '';

    const nome = document.createElement('div');
    container.appendChild(nome);
    nome.textContent = 'Nome';
    nome.style.height = "8vh";
    nome.style.width = "30vw";
    nome.style.fontFamily = "Inter, sans-serif";
    nome.style.fontSize = "2.5vh";
    nome.style.fontWeight = "bold";
    nome.style.borderWidth = "0 .1vw .1vw 0";
    nome.style.borderStyle = "solid";
    nome.style.borderColor = "#c7c7c7";
    nome.style.position = "absolute";
    nome.style.display = "flex";
    nome.style.justifyContent = "center";
    nome.style.alignItems = "center";

    const turmaID = document.createElement('div');
    container.appendChild(turmaID);
    turmaID.textContent = 'turmaID';
    turmaID.style.height = "8vh";
    turmaID.style.width = "30vw";
    turmaID.style.fontFamily = "Inter, sans-serif";
    turmaID.style.fontSize = "2.5vh";
    turmaID.style.fontWeight = "bold";
    turmaID.style.borderWidth = "0 0 .1vw 0";
    turmaID.style.borderStyle = "solid";
    turmaID.style.borderColor = "#c7c7c7";
    turmaID.style.position = "absolute";
    turmaID.style.left = "30vw"
    turmaID.style.display = "flex";
    turmaID.style.justifyContent = "center";
    turmaID.style.alignItems = "center";

    try {
        const turmaID = document.getElementById('turmaID').textContent; // Supondo que você tenha um elemento com id 'turmaID'
        const resposta = await fetch(`http://localhost:3000/carregarMaterias2?turmaID=${turmaID}`);
        if(resposta.ok) {
            const materiasTurma = await resposta.json();

            materiasTurma.forEach(materiaT => {
                const containerInfo = document.createElement('div');
                const nomeDiv = document.createElement('div');
                const turmaIDDiv = document.createElement('div');
                container.appendChild(containerInfo);
                containerInfo.appendChild(nomeDiv);
                containerInfo.appendChild(turmaIDDiv);

                containerInfo.style.fontSize = "2vh";
                containerInfo.style.fontFamily = "Inter, sans-serif";
                containerInfo.style.width = "60vw";
                containerInfo.style.display = "flex";
                containerInfo.style.flexDirection = "row";
                containerInfo.style.position = "relative";
                containerInfo.style.top = "8vh";

                nomeDiv.style.height = "6vh";
                nomeDiv.style.width = "30vw";
                nomeDiv.style.backgroundColor = "#e4e4e4";
                nomeDiv.style.borderWidth = "0 .1vw .1vw 0";
                nomeDiv.style.borderStyle = "solid";
                nomeDiv.style.borderColor = "#c7c7c7";
                nomeDiv.style.display = "flex";
                nomeDiv.style.justifyContent ="center";
                nomeDiv.style.alignItems = "center";

                turmaIDDiv.textContent = materiaT.turmaIDAluno;
                turmaIDDiv.style.height = "6vh";
                turmaIDDiv.style.width = "30vw";
                turmaIDDiv.style.backgroundColor = "#e4e4e4";
                turmaIDDiv.style.borderWidth = "0 0 .1vw 0";
                turmaIDDiv.style.borderStyle = "solid";
                turmaIDDiv.style.borderColor = "#c7c7c7";
                turmaIDDiv.style.display = "flex";
                turmaIDDiv.style.justifyContent ="center";
                turmaIDDiv.style.alignItems = "center";

                const pagAtividades = ``;
                const blob = new Blob([pagAtividades], { type: 'text/html' });

                const link = document.createElement('a');
                nomeDiv.appendChild(link);
                link.href = URL.createObjectURL(blob);
                link.textContent = materiaT.nomeMateria;
                link.style.color = "#000"
                link.style.textDecoration = "none"
            });
        } else {
            alert('malandrage se ta no erro kkkkkkkk');
        }
    } catch(error) {
        console.error("Erro ao encontrar matérias", error);
    }
}