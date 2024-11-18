CREATE DATABASE SistemaEscolar
GO
USE SistemaEscolar
GO
-- Criando a tabela professor 
CREATE TABLE Professor (
    ID_Professor INT PRIMARY KEY,
    Nome_Professor VARCHAR(50) NOT NULL,
    CPF_Professor CHAR(14) NOT NULL UNIQUE,
    Email_Professor VARCHAR(50) NOT NULL UNIQUE,
    ID_Turma INT,
);

-- Criando a tabela Turma
CREATE TABLE Turma (
    ID_Turma INT PRIMARY KEY,
    Nome_Turma VARCHAR(10) NOT NULL,
    ID_Período INT NOT NULL,
);

-- Criando a tabela Aluno
CREATE TABLE Alunos (
    ID_Aluno INT PRIMARY KEY,
    Nome_Aluno VARCHAR(50) NOT NULL,
    CPF_Aluno CHAR(14) NOT NULL UNIQUE,
    Email_Aluno VARCHAR(50) NOT NULL UNIQUE,
    Telefone_Aluno CHAR(11),
    ID_Turma INT NOT NULL,
);

-- Criando a tabela Diciplinas
CREATE TABLE Disciplinas (
    Nome_Disciplina VARCHAR(30) NOT NULL,
    ID_Turma INT NOT NULL,
    PRIMARY KEY (Nome_Disciplina, ID_Turma),
);

-- Criando a tabela Atividade
CREATE TABLE Atividade (
    ID_Atividade INT PRIMARY KEY,
    Nome_Atividade VARCHAR(50) NOT NULL,
    ID_Turma INT NOT NULL,
    ID_Aluno INT NOT NULL,
    Descrição_Atividade VARCHAR(100),
    Nota INT CHECK (Nota >= 0 AND Nota <= 100),
);

-- Criando a tabela Presença
CREATE TABLE Presença (
    ID_Presença INT PRIMARY KEY,
    Tipo_Presença VARCHAR(10) NOT NULL
);

-- Criando a tabela Período
CREATE TABLE Período (
    ID_Período INT PRIMARY KEY,
    Tipo_Período VARCHAR(50) NOT NULL
);

-- Criando a tabela Faltas
CREATE TABLE Faltas (
    ID_Falta INT PRIMARY KEY,
    ID_Aluno INT NOT NULL,
);

ALTER TABLE Professor
ADD CONSTRAINT FK_Professor_Turma FOREIGN KEY (ID_Turma)
REFERENCES Turma(ID_Turma)

ALTER TABLE Turma
ADD CONSTRAINT FK_Turma_Período FOREIGN KEY (ID_Período)
REFERENCES Período(ID_Período)

ALTER TABLE Alunos
ADD CONSTRAINT FK_Alunos_Turma FOREIGN KEY (ID_Turma)
REFERENCES Turma(ID_Turma)

ALTER TABLE Disciplinas
ADD CONSTRAINT FK_Disciplinas_Turma FOREIGN KEY (ID_Turma)
REFERENCES Turma(ID_Turma)

ALTER TABLE Atividade
ADD CONSTRAINT FK_Atividade_Turma FOREIGN KEY (ID_Turma)
REFERENCES Turma(ID_Turma)

ALTER TABLE Atividade
ADD CONSTRAINT FK_Atividade_Aluno FOREIGN KEY (ID_Aluno)
REFERENCES Alunos(ID_Aluno)

ALTER TABLE Faltas
ADD CONSTRAINT FK_Faltas_Aluno FOREIGN KEY (ID_Aluno)
REFERENCES Alunos(ID_Aluno)