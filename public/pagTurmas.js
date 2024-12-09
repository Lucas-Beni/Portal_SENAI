async function exibirTurmas() {
    const container = document.getElementById('containerTurmas');
    container.innerHTML = '';
    if (!container) {
        alert("Elemento 'containerTurmas' não encontrado no DOM");
        return;
    }

    const nome = document.createElement('div');
    container.appendChild(nome);
    nome.textContent = 'Turmas';
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

    const periodo = document.createElement('div');
    container.appendChild(periodo);
    periodo.textContent = 'Período';
    periodo.style.height = "8vh";
    periodo.style.width = "30vw";
    periodo.style.fontFamily = "Inter, sans-serif";
    periodo.style.fontSize = "2.5vh";
    periodo.style.fontWeight = "bold";
    periodo.style.borderWidth = "0 0 .1vw 0";
    periodo.style.borderStyle = "solid";
    periodo.style.borderColor = "#c7c7c7";
    periodo.style.position = "absolute";
    periodo.style.left = "30vw";
    periodo.style.display = "flex";
    periodo.style.justifyContent = "center";
    periodo.style.alignItems = "center";

    try {
        const resposta = await fetch('http://localhost:3000/carregarTurmas');
        if (resposta.ok) {
            const turmasProfessor = await resposta.json();

            turmasProfessor.forEach(turmaP => {
                const containerInfo = document.createElement('div');
                const nomeDiv = document.createElement('div');
                const periodoDiv = document.createElement('div');
                container.appendChild(containerInfo);
                containerInfo.appendChild(nomeDiv);
                containerInfo.appendChild(periodoDiv);

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

                periodoDiv.textContent = turmaP.periodo;
                periodoDiv.style.height = "6vh";
                periodoDiv.style.width = "30vw";
                periodoDiv.style.backgroundColor = "#e4e4e4";
                periodoDiv.style.borderWidth = "0 0 .1vw 0";
                periodoDiv.style.borderStyle = "solid" ;
                periodoDiv.style.borderColor = "#c7c7c7";
                periodoDiv.style.display = "flex";
                periodoDiv.style.justifyContent = "center";
                periodoDiv.style.alignItems = "center";

                const pagAlunosMaterias = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="http://localhost:3000/pagAlunosMaterias.css">
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
                    <title id="title">${turmaP.nomeTurma}</title>
                </head>
                <body onload="exibirAlunos()">
                    <header>
                        <div id="turma">${turmaP.nomeTurma}</div>
                        <img src="img/menu (1).png" alt="a" id="menu">
                        <img src="img/logo.png" alt="a" id="logo">
                        <img src="img/login (1).png" alt="a" id="login">
                        <div>
                            <a href="coloca.aqui.html">Login</a>
                        </div>
                    </header>
                    <div id="containerConteudo">
                        <div id="abaA" onclick="exibirAlunos()">Alunos</div>
                        <div id="abaM" onclick="exibirMaterias()">Matérias</div>
                        <div id="containerAlunos"></div>
                    </div>
                    <a href=".html" id="presenca">Adicionar Presença</a>
                    <script>
                        const turmaID = ${turmaP.turmaID};
                    </script>
                    <script src="http://localhost:3000/pagAlunosMaterias.js"></script>
                </body>
                </html>`;
                const blob = new Blob([pagAlunosMaterias], { type: 'text/html' });

                const link = document.createElement('a');
                nomeDiv.appendChild(link);
                link.href = URL.createObjectURL(blob);
                link.textContent = turmaP.nomeTurma;
                link.style.color = "#000"
                link.style.textDecoration = "none"
            });
        } else {
            alert('Deu erro chefia.');
        }
    } catch(error) {
        console.error("Erro ao obter as turmas:", error);
    }
}