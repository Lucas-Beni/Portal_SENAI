const sql = require('mssql');

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

// Função para buscar turmas no banco de dados
async function fetchTurmas() {
    try {
        await sql.connect(dbConfig);
        const query = `SELECT turmaID, nomeTurma FROM dimTurmas`;
        const result = await new sql.Request().query(query);
        return result.recordset; // Retorna os registros das turmas
    } catch (err) {
        console.error('Erro ao buscar turmas:', err);
        throw new Error('Erro ao buscar turmas');
    } finally {
        sql.close(); // Fecha a conexão
    }
}

module.exports = { fetchTurmas };
