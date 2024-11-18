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
    ID_Per�odo INT NOT NULL,
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
    Descri��o_Atividade VARCHAR(100),
    Nota INT CHECK (Nota >= 0 AND Nota <= 100),
);

-- Criando a tabela Presen�a
CREATE TABLE Presen�a (
    ID_Presen�a INT PRIMARY KEY,
    Tipo_Presen�a VARCHAR(10) NOT NULL
);

-- Criando a tabela Per�odo
CREATE TABLE Per�odo (
    ID_Per�odo INT PRIMARY KEY,
    Tipo_Per�odo VARCHAR(50) NOT NULL
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
ADD CONSTRAINT FK_Turma_Per�odo FOREIGN KEY (ID_Per�odo)
REFERENCES Per�odo(ID_Per�odo)

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