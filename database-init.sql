-- Script de inicialização do banco de dados para o projeto Sistema de Gerenciamento
-- Configure o arquivo .env com os valores corretos antes de executar.

CREATE DATABASE IF NOT EXISTS db_sis_tcc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_sis_tcc;

CREATE TABLE IF NOT EXISTS role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  descricao VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `user` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  telefone VARCHAR(50) NULL,
  idade INT NULL,
  genero VARCHAR(30) NULL,
  foto VARCHAR(255) NULL,
  role_id DECIMAL(3,1) NOT NULL DEFAULT 3,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO role (nome, descricao) VALUES
('Admin', 'Usuário administrador do sistema'),
('Coordenador', 'Usuário com papel de coordenador'),
('Orientador', 'Usuário com papel de orientador'),
('Aluno', 'Usuário com papel de aluno')
ON DUPLICATE KEY UPDATE nome = VALUES(nome);

-- Cria usuário de aplicação dedicado e concede privilégios ao banco de dados do sistema
CREATE USER IF NOT EXISTS 'sis_tcc_app'@'localhost' IDENTIFIED BY 'SenhaApp123!';
GRANT SELECT, INSERT, UPDATE, DELETE ON db_sis_tcc.* TO 'sis_tcc_app'@'localhost';
FLUSH PRIVILEGES;
