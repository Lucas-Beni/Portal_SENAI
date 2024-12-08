const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();
const port = 3000;

// Configuração do banco de dados
const dbConfig = {
    user: 'appUser',
    password: 'SenhaForte@123',
    server: '127.0.0.1',
    database: 'sistemaEscolar',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'

// Início do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// 1. Rota para carregar turmas
app.get("/turmas", async (req, res) => {
    try {
        await sql.connect(dbConfig);
        const result = await sql.query('SELECT turmaID, nomeTurma FROM dimTurmas');
        res.json(result.recordset); // Retorna as turmas
    } catch (err) {
        console.error("Erro ao carregar turmas:", err);
        res.status(500).json({ error: "Erro ao carregar turmas." });
    }
});

// 2. Rota para obter alunos de uma turma
app.get("/alunos", async (req, res) => {
    const turmaID = parseInt(req.query.turmaID, 10);
    if (!turmaID || turmaID <= 0) {
        return res.status(400).json({ error: "ID da turma inválido" });
    }

    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('turmaID', sql.Int, turmaID)
            .query('SELECT alunoID, nomeAluno FROM dimAlunos WHERE turmaID = @turmaID');
        res.json(result.recordset); // Retorna os alunos
    } catch (err) {
        console.error("Erro ao consultar alunos:", err);
        res.status(500).json({ error: "Erro ao consultar alunos." });
    }
});

// 3. Rota para salvar as frequências dos alunos
app.post("/frequencias", async (req, res) => {
    const { data, aula, registros } = req.body;

    if (!data || !aula || !Array.isArray(registros)) {
        return res.status(400).json({ error: "Dados inválidos." });
    }

    try {
        await sql.connect(dbConfig);

        // Itera sobre os registros e insere cada um no banco de dados
        for (const registro of registros) {
            const { alunoID, presenca } = registro;

            if (!alunoID || !["A", "P", "D"].includes(presenca)) {
                continue; // Ignora registros inválidos
            }

            const request = new sql.Request();
            request.input("data", sql.Date, data);
            request.input("aula", sql.NVarChar, aula);
            request.input("alunoID", sql.Int, alunoID);
            request.input("presenca", sql.Char(1), presenca);

            const query = `
                INSERT INTO factFrequencias (data, aula, alunoID, presenca)
                VALUES (@data, @aula, @alunoID, @presenca)
            `;
            await request.query(query);
        }

        res.status(201).send("Frequências salvas com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar frequências:", error);
        res.status(500).json({ error: "Erro ao salvar frequências." });
    }
});

// 4. Rota para cadastrar um professor
app.post('/adicionar-professor', async (req, res) => {
    const { nome, senha, email } = req.body;  

    try {
        await sql.connect(dbConfig);
        const query = `
            INSERT INTO dimProfessores (nomeProfessor, Senha, emailProfessor)
            VALUES (@nome, @senha, @email)
        `;
        const request = new sql.Request();
        request.input('nome', sql.NVarChar, nome);
        request.input('senha', sql.NVarChar, senha); 
        request.input('email', sql.NVarChar, email); 
        await request.query(query);
        res.send('Usuário adicionado com sucesso!'); 
    } catch (error) {
        res.status(500).send('Erro ao adicionar usuário: ' + error.message);
    }
});

// 5. Rota para cadastrar um aluno
app.post('/adicionar-aluno', async (req, res) => {
    const { nomeAluno, cpfAluno, telefoneAluno, turmaID, emailAluno, foto } = req.body;

    try {
        await sql.connect(dbConfig);
        const query = `
            INSERT INTO dimAlunos (nomeAluno, cpfAluno, telefoneAluno, turmaID, emailAluno, foto)
            VALUES (@nomeAluno, @cpfAluno, @telefoneAluno, @turmaID, @emailAluno, @foto)
        `;
        const request = new sql.Request();
        request.input('nomeAluno', sql.NVarChar, nomeAluno);
        request.input('cpfAluno', sql.NVarChar, cpfAluno);
        request.input('telefoneAluno', sql.NVarChar, telefoneAluno);
        request.input('turmaID', sql.Int, turmaID);
        request.input('emailAluno', sql.NVarChar, emailAluno);
        request.input('foto', sql.VarBinary, foto);
        await request.query(query);

        res.send('Aluno adicionado com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao adicionar aluno: ' + error.message);
    }
});

// 6. Rota para cadastrar uma turma
app.post('/adicionar-turma', async (req, res) => {
    const { nomeTurma, periodo } = req.body;
    const dataInicio = new Date();

    try {
        await sql.connect(dbConfig);
        const query = `
            INSERT INTO dimTurmas (nomeTurma, periodo, dataInicio)
            VALUES (@nomeTurma, @periodo, @dataInicio)
        `;
        const request = new sql.Request();
        request.input('nomeTurma', sql.NVarChar, nomeTurma);
        request.input('periodo', sql.NVarChar, periodo);
        request.input('dataInicio', sql.Date, dataInicio);
        await request.query(query);

        res.send('Turma adicionada com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao adicionar turma: ' + error.message);
    }
});

// 7. Rota para cadastrar uma matéria
app.post('/adicionar-materia', async (req, res) => {
    const { nomeMateria } = req.body;

    try {
        await sql.connect(dbConfig);
        const query = `
            INSERT INTO dimMaterias (nomeMateria)
            VALUES (@nomeMateria)
        `;
        const request = new sql.Request();
        request.input('nomeMateria', sql.NVarChar, nomeMateria);
        await request.query(query);

        res.send('Matéria adicionada com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao adicionar matéria: ' + error.message);
    }
});

// 8. Rota para cadastrar uma atividade
app.post('/adicionar-atividade', async (req, res) => {
    const { nomeAtividade, materiaID, semestre, descricao } = req.body;

    try {
        await sql.connect(dbConfig);
        const query = `
            INSERT INTO dimAtividades (nomeAtividade, materiaID, semestre, descricao)
            VALUES (@nomeAtividade, @materiaID, @semestre, @descricao)
        `;
        const request = new sql.Request();
        request.input('nomeAtividade', sql.NVarChar, nomeAtividade);
        request.input('materiaID', sql.Int, materiaID);
        request.input('semestre', sql.Int, semestre);
        request.input('descricao', sql.NVarChar, descricao);
        await request.query(query);

        res.send('Atividade adicionada com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao adicionar atividade: ' + error.message);
    }
});
