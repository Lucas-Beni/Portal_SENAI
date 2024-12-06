async function exibirTurmas() {
    const container = document.getElementById('containerTurmas');
    container.innerHTML = '';

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
    if (!container) {
        alert("Elemento 'containerTurmas' não encontrado no DOM");
        return;
    }

    try {
        const resposta = await fetch('http://localhost:3000/exibirTurmas');
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

                const pagAlunos = '';
                const blob = new Blob([pagAlunos], { type: 'text/html' });

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
    } catch (error) {
        console.error("Erro ao obter as turmas:", error);
    }
}
