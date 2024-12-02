const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();
const port = 3000;

const dbConfig = {
    user: 'appUser',
    password: '1',
    server: '127.0.0.1',
    database: 'sistemaEscolar',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'

// Alunos
app.post('/adicionar-aluno', async (req, res) => {
    const {nomeAluno, cpfAluno, telefoneAluno, turmaID, emailAluno, foto } = req.body;

    try {
        await sql.connect(dbConfig);
        const query = `
            INSERT INTO dimAlunos (nomeAluno, cpfAluno, telefoneAluno, turmaID, emailAluno, foto)
            VALUES ( @nomeAluno, @cpfAluno, @telefoneAluno, @turmaID, @emailAluno, @foto)
        `;
        const request = new sql.Request();
        request.input('nomeAluno', sql.NVarChar, nomeAluno);
        request.input('cpfAluno', sql.NVarChar, cpfAluno);
        request.input('telefoneAluno', sql.NVarChar, telefoneAluno);
        request.input('turmaID', sql.Int, turmaID);
        request.input('emailAluno', sql.NVarChar, emailAluno);
        request.input('foto', sql.VarBinary, foto);
        await request.query(query);

        res.send('Produto adicionado com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao adicionar produto: ' + error.message);
    }
});

// Turmas
app.post('/adicionar-turma', async (req, res) => {
    const {nomeTurma, periodo} = req.body;
    const dataInicio = new Date()

    try {
        await sql.connect(dbConfig);
        const query = `
            INSERT INTO dimTurmas (nomeTurma, periodo, dataInicio)
            VALUES ( @nomeTurma, @periodo, @dataInicio)
        `;
        const request = new sql.Request();
        request.input('nomeTurma', sql.NVarChar, nomeTurma);
        request.input('periodo', sql.NVarChar, periodo);
        request.input('dataInicio', sql.Date, dataInicio);
        await request.query(query);

        res.send('Produto adicionado com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao adicionar produto: ' + error.message);
    }
});

//Matérias
app.post('/adicionar-materia', async (req, res) => {
    const {nomeMateria} = req.body;

    try {
        await sql.connect(dbConfig);
        const query = `
            INSERT INTO dimMaterias (nomeMateria)
            VALUES ( @nomeMateria)
        `;
        const request = new sql.Request();
        request.input('nomeMateria', sql.NVarChar, nomeMateria);
        await request.query(query);

        res.send('Produto adicionado com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao adicionar produto: ' + error.message);
    }
});

//TESTE
app.get('/carregarTurmas', async (req, res) => {
    try {
        // Conectar ao banco
        await sql.connect(dbConfig);

        const query = `SELECT turmaID, nomeTurma FROM dimTurmas`;

        const result = await new sql.Request().query(query);

        // Retornar as turmas como JSON
        res.json(result.recordset);

    } catch (err) {
        console.error('Erro ao conectar ou buscar dados:', err);
        res.status(500).send('Erro ao buscar turmas');
    } finally {
        sql.close();
    }
});

//TESTE
app.get('/carregarMaterias', async (req, res) => {
    try {
        // Conectar ao banco
        await sql.connect(dbConfig);

        const query = `SELECT materiaID, nomeMateria FROM dimMaterias`;

        const result = await new sql.Request().query(query);

        // Retornar as turmas como JSON
        res.json(result.recordset);

    } catch (err) {
        console.error('Erro ao conectar ou buscar dados:', err);
        res.status(500).send('Erro ao buscar matérias');
    } finally {
        sql.close();
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});