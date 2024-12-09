const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();
const port = 3000;

// Configuração do banco de dados
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

//CADASTRO
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

// Deletar Turmas
app.post('/deletarTurmas', async (req, res) => {
    console.log(req.body); // Log dos dados recebidos
    const { idsTurmas } = req.body;

    if (!idsTurmas || !Array.isArray(idsTurmas)) {
        console.error('IDs inválidos recebidos:', idsTurmas);
        return res.status(400).send('IDs inválidos.');
    }

    try {
        const pool = await sql.connect(dbConfig);

        const deleteAlunosQuery = `DELETE FROM dimAlunos WHERE turmaID IN (${idsTurmas.map(id => `'${id}'`).join(',')})`;
        console.log('Query para deletar alunos:', deleteAlunosQuery);
        await pool.request().query(deleteAlunosQuery);

        const deleteMateriaTurmaQuery = `DELETE FROM materiasTurmas WHERE turmaID IN (${idsTurmas.map(id => `'${id}'`).join(',')})`;
        console.log('Query para deletar materiasTumas:', deleteMateriaTurmaQuery);
        await pool.request().query(deleteMateriaTurmaQuery);

        const deleteAtividadeTurmaQuery = `DELETE FROM atividadesTurmas WHERE turmaID IN (${idsTurmas.map(id => `'${id}'`).join(',')})`;
        console.log('Query para deletar atividadesTumas:', deleteAtividadeTurmaQuery);
        await pool.request().query(deleteAtividadeTurmaQuery);

        const deleteTurmasQuery = `DELETE FROM dimTurmas WHERE turmaID IN (${idsTurmas.map(id => `'${id}'`).join(',')})`;
        console.log('Query para deletar turmas:', deleteTurmasQuery);
        await pool.request().query(deleteTurmasQuery);

        res.status(200).send('Turmas e alunos deletados com sucesso.');
    } catch (error) {
        console.error('Erro ao deletar turmas e alunos:', error);
        res.status(500).send('Erro interno no servidor.');
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

// Deletar Materias
app.post('/deletarMaterias', async (req, res) => {
    console.log(req.body); // Log dos dados recebidos
    const { idsMaterias } = req.body;

    if (!idsMaterias || !Array.isArray(idsMaterias)) {
        console.error('IDs inválidos recebidos:', idsMaterias);
        return res.status(400).send('IDs inválidos.');
    }

    try {
        const pool = await sql.connect(dbConfig);

        const deleteMateriaTurmaQuery = `DELETE FROM materiasTurmas WHERE materiaID IN (${idsMaterias.map(id => `'${id}'`).join(',')})`;
        console.log('Query para deletar materiasTumas:', deleteMateriaTurmaQuery);
        await pool.request().query(deleteMateriaTurmaQuery);

        const deleteMateriaAtividadeQuery = `DELETE FROM dimAtividades WHERE materiaID IN (${idsMaterias.map(id => `'${id}'`).join(',')})`;
        console.log('Query para deletar materiasAtividades:', deleteMateriaAtividadeQuery);
        await pool.request().query(deleteMateriaAtividadeQuery);

        const deleteMateriasQuery = `DELETE FROM dimMaterias WHERE materiaID IN (${idsMaterias.map(id => `'${id}'`).join(',')})`;
        console.log('Query para deletar materias:', deleteMateriasQuery);
        await pool.request().query(deleteMateriasQuery);

        res.status(200).send('Materias deletadas com sucesso.');
    } catch (error) {
        console.error('Erro ao deletar materias:', error);
        res.status(500).send('Erro interno no servidor.');
    }
});

//Atividades
app.post('/adicionar-atividade', async (req, res) => {
    const {nomeAtividade, materiaID, semestre, descricao} = req.body;

    try {
        await sql.connect(dbConfig);
        const query = `
            INSERT INTO dimAtividades (nomeAtividade, materiaID, semestre, descricao)
            VALUES ( @nomeAtividade, @materiaID, @semestre, @descricao)
        `;
        const request = new sql.Request();
        request.input('nomeAtividade', sql.NVarChar, nomeAtividade);
        request.input('materiaID', sql.Int, materiaID);
        request.input('semestre', sql.Int, semestre);
        request.input('descricao', sql.NVarChar, descricao);
        await request.query(query);

        res.send('Produto adicionado com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao adicionar produto: ' + error.message);
    }
});

// Deletar Atividades
app.post('/deletarAtividades', async (req, res) => {
    console.log(req.body); // Log dos dados recebidos
    const { idsAtividades } = req.body;

    if (!idsAtividades || !Array.isArray(idsAtividades)) {
        console.error('IDs inválidos recebidos:', idsAtividades);
        return res.status(400).send('IDs inválidos.');
    }

    try {
        const pool = await sql.connect(dbConfig);

        const deleteAtividadeTurmaQuery = `DELETE FROM atividadesTurmas WHERE atividadeID IN (${idsAtividades.map(id => `'${id}'`).join(',')})`;
        console.log('Query para deletar atividadesTumas:', deleteAtividadeTurmaQuery);
        await pool.request().query(deleteAtividadeTurmaQuery);

        const deleteAtividadesQuery = `DELETE FROM dimAtividades WHERE atividadeID IN (${idsAtividades.map(id => `'${id}'`).join(',')})`;
        console.log('Query para deletar atividades:', deleteAtividadesQuery);
        await pool.request().query(deleteAtividadesQuery);

        res.status(200).send('Atividades deletadas com sucesso.');
    } catch (error) {
        console.error('Erro ao deletar atividades:', error);
        res.status(500).send('Erro interno no servidor.');
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

app.get('/carregarAtividades', async (req, res) => {
    try {
        // Conectar ao banco
        await sql.connect(dbConfig);

        const query = `SELECT atividadeID, nomeAtividade FROM dimAtividades`;

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

app.post('/associarMateriaTurmas', async (req, res) => {
    const { materiaID, turmaIDs } = req.body;

    if (!materiaID || !Array.isArray(turmaIDs) || turmaIDs.length === 0) {
        return res.status(400).send('Dados inválidos.');
    }

    try {
        await sql.connect(dbConfig);

        for (const turmaID of turmaIDs) {
            const request = new sql.Request(); // Cria uma nova instância para cada iteração
            request.input('materiaID', sql.Int, materiaID);
            request.input('turmaID', sql.Int, turmaID);

            const query = `
                INSERT INTO materiasTurmas (materiaID, turmaID)
                VALUES (@materiaID, @turmaID)
            `;
            await request.query(query);
        }

        res.send('Matéria associada às turmas selecionadas com sucesso!');
    } catch (error) {
        console.error('Erro ao associar matéria às turmas:', error);
        res.status(500).send('Erro ao associar matéria às turmas.');
    } finally {
        sql.close();
    }
});

app.post('/associarAtividadeTurmas', async (req, res) => {
    const { atividadeID, turmaIDs } = req.body;

    if (!atividadeID || !Array.isArray(turmaIDs) || turmaIDs.length === 0) {
        return res.status(400).send('Dados inválidos.');
    }

    try {
        await sql.connect(dbConfig);

        for (const turmaID of turmaIDs) {
            const request = new sql.Request(); // Cria uma nova instância para cada iteração
            request.input('atividadeID', sql.Int, atividadeID);
            request.input('turmaID', sql.Int, turmaID);

            const query = `
                INSERT INTO atividadesTurmas (atividadeID, turmaID)
                VALUES (@atividadeID, @turmaID)
            `;
            await request.query(query);
        }

        res.send('Matéria associada às turmas selecionadas com sucesso!');
    } catch (error) {
        console.error('Erro ao associar matéria às turmas:', error);
        res.status(500).send('Erro ao associar matéria às turmas.');
    } finally {
        sql.close();
    }
});

// Rota para obter os alunos de uma turma
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