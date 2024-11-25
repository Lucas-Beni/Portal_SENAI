const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();
const port = 3000;

const dbConfig = {
    user: 'rian',
    password: '1234',
    server: '127.0.0.1',
    database: 'sistemaEscolar',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

app.use(cors());
app.use(express.json());
app.use(express.static('public')); 

app.post('/adicionar-produto', async (req, res) => {
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

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});