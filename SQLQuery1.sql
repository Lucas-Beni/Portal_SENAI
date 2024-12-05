-- Exclui o banco de dados "SistemaEscolar" caso ele já exista
DROP DATABASE SistemaEscolar
GO

-- Cria o banco de dados "sistemaEscolar"
CREATE DATABASE sistemaEscolar
GO

-- Define o banco de dados a ser utilizado
USE sistemaEscolar
GO

-- Cria a tabela "dimAlunos", com dados dos alunos
CREATE TABLE dimAlunos (
    alunoID INT PRIMARY KEY NOT NULL IDENTITY (1,1), -- ID do aluno, com auto-incremento
    nomeAluno NVARCHAR(30) NOT NULL, -- Nome do aluno
    cpfAluno NVARCHAR(14) NOT NULL UNIQUE, -- CPF do aluno, único
    telefoneAluno NVARCHAR(10) NOT NULL UNIQUE, -- Telefone do aluno, único
	emailAluno NVARCHAR(50) NOT NULL UNIQUE,
    turmaID INT NOT NULL, -- ID da turma a qual o aluno pertence
    foto VARBINARY(MAX) NOT NULL -- Foto do aluno (armazenada em formato binário)
)

-- Cria a tabela "dimAtividades", que armazena informações sobre as atividades dos alunos
CREATE TABLE dimAtividades (
    atividadeID INT PRIMARY KEY NOT NULL IDENTITY (1,1), -- ID da atividade, com auto-incremento
    nomeAtividade NVARCHAR(30) NOT NULL, -- Nome da atividade
    turmaID INT, -- ID da turma
    materiaID INT NOT NULL, -- ID da matéria relacionada à atividade
    alunoID INT,-- ID do aluno relacionado à atividade
	semestre INT NOT NULL, 
    descricao NVARCHAR(100) -- Descrição da atividade
)

-- Cria a tabela "dimMaterias", que armazena as matérias
CREATE TABLE dimMaterias (
    materiaID INT PRIMARY KEY NOT NULL IDENTITY (1,1), -- ID da matéria, com auto-incremento
    nomeMateria NVARCHAR(20) NOT NULL -- Nome da matéria
)

-- Cria a tabela "dimProfessores", que armazena informações dos professores
CREATE TABLE dimProfessores (
    professorID INT PRIMARY KEY NOT NULL IDENTITY (1,1), -- ID do professor, com auto-incremento
    nomeProfessor NVARCHAR(30) NOT NULL, -- Nome do professor
    emailProfessor NVARCHAR(70) NOT NULL UNIQUE, -- E-mail do professor, único
    senha NVARCHAR(20) -- Senha do professor
)

-- Cria a tabela "dimTurmas", que armazena informações sobre as turmas
CREATE TABLE dimTurmas (
    turmaID INT PRIMARY KEY NOT NULL IDENTITY (1,1), -- ID da turma, com auto-incremento
    nomeTurma NVARCHAR(10) NOT NULL, -- Nome da turma,
	periodo NVARCHAR(20) NOT NULL,
    dataInicio DATE, -- Data de início da turma
    dataFim DATE -- Data de fim da turma (opcional)
)

-- Cria a tabela "factFrequencias", que armazena a frequência dos alunos
CREATE TABLE factFrequencias (
    frequenciaID INT PRIMARY KEY NOT NULL IDENTITY (1,1), -- ID da frequência, com auto-incremento
    alunoID INT NOT NULL, -- ID do aluno
    [data] DATETIME NOT NULL, -- Data da aula
    aula INT NOT NULL, -- Número da aula
    presenca NVARCHAR(1) NOT NULL -- Presença (P - presente, A - ausente)
)

-- Cria a tabela "factNotas", que armazena as notas dos alunos nas atividades
CREATE TABLE factNotas (
    notaID INT PRIMARY KEY NOT NULL IDENTITY (1,1), -- ID da nota, com auto-incremento
    alunoID INT NOT NULL, -- ID do aluno
    atividadeID INT NOT NULL, -- ID da atividade
    semestre INT NOT NULL, -- Semestre da nota
    nota FLOAT CHECK(nota >=0 AND nota <=100) -- Nota (de 0 a 100)
)

-- Cria a tabela "materiasTurmas", que associa matérias com turmas
CREATE TABLE materiasTurmas(
    mtID INT PRIMARY KEY NOT NULL IDENTITY (1,1), -- ID da associação, com auto-incremento
    materiaID INT NOT NULL, -- ID da matéria
    turmaID INT NOT NULL -- ID da turma
)

-- Cria a tabela "professoresTurmas", que associa professores com turmas
CREATE TABLE professoresTurmas (
    ptID INT PRIMARY KEY NOT NULL IDENTITY (1,1), -- ID da associação, com auto-incremento
    professorID INT NOT NULL, -- ID do professor
    turmaID INT NOT NULL -- ID da turma
)
GO

-- Adiciona a chave estrangeira entre a tabela "dimAlunos" e a tabela "dimTurmas"
ALTER TABLE dimAlunos
ADD CONSTRAINT FK_dimAlunos_dimTurmas FOREIGN KEY (turmaID)
REFERENCES dimTurmas(turmaID)
GO

-- Adiciona a chave estrangeira entre a tabela "dimAtividades" e a tabela "dimTurmas"
ALTER TABLE dimAtividades
ADD CONSTRAINT FK_dimAtividades_dimTurmas FOREIGN KEY (turmaID)
REFERENCES dimTurmas(turmaID)
GO

-- Adiciona a chave estrangeira entre a tabela "dimAtividades" e a tabela "dimAlunos"
ALTER TABLE dimAtividades
ADD CONSTRAINT FK_dimAtividades_dimAlunos FOREIGN KEY (alunoID)
REFERENCES dimAlunos(alunoID)
GO

-- Adiciona a chave estrangeira entre a tabela "dimAtividades" e a tabela "dimMaterias"
ALTER TABLE dimAtividades
ADD CONSTRAINT FK_dimAtividades_dimMaterias FOREIGN KEY (materiaID)
REFERENCES dimMaterias(materiaID)
GO

-- Adiciona a chave estrangeira entre a tabela "factNotas" e a tabela "dimAlunos"
ALTER TABLE factNotas
ADD CONSTRAINT FK_factNotas_dimAlunos FOREIGN KEY (alunoID)
REFERENCES dimAlunos(alunoID)
GO

-- Adiciona a chave estrangeira entre a tabela "factFrequencias" e a tabela "dimAlunos"
ALTER TABLE factFrequencias
ADD CONSTRAINT FK_factFrequencias_dimAlunos FOREIGN KEY (alunoID)
REFERENCES dimAlunos(alunoID)
GO

-- Adiciona a chave estrangeira entre a tabela "factNotas" e a tabela "dimAtividades"
ALTER TABLE factNotas
ADD CONSTRAINT FK_factNotas_dimAtividades FOREIGN KEY (atividadeID)
REFERENCES dimAtividades(atividadeID)
GO

-- Adiciona a chave estrangeira entre a tabela "materiasTurmas" e a tabela "dimMaterias"
ALTER TABLE materiasTurmas
ADD CONSTRAINT FK_materiasTurmas_dimMaterias FOREIGN KEY (materiaID)
REFERENCES dimMaterias(materiaID)
GO

-- Adiciona a chave estrangeira entre a tabela "materiasTurmas" e a tabela "dimTurmas"
ALTER TABLE materiasTurmas
ADD CONSTRAINT FK_materiasTurmas_dimTurmas FOREIGN KEY (turmaID)
REFERENCES dimTurmas(turmaID)
GO

-- Adiciona a chave estrangeira entre a tabela "professoresTurmas" e a tabela "dimProfessores"
ALTER TABLE professoresTurmas
ADD CONSTRAINT FK_professoresTurmas_dimProfessores FOREIGN KEY (professorID)
REFERENCES dimProfessores(professorID)
GO

-- Adiciona a chave estrangeira entre a tabela "professoresTurmas" e a tabela "dimTurmas"
ALTER TABLE professoresTurmas
ADD CONSTRAINT FK_professoresTurmas_dimTurmas FOREIGN KEY (turmaID)
REFERENCES dimTurmas(turmaID)
GO

SELECT * FROM dimAlunos
SELECT * FROM dimTurmas

USE sistemaEscolar; -- Substitua pelo nome do seu banco de dados
GO

CREATE USER [appUser] FOR LOGIN [appUser];
GO

ALTER ROLE db_datareader ADD MEMBER [appUser];
ALTER ROLE db_datawriter ADD MEMBER [appUser];
GO