const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// arquivo de banco dentro da pasta data (criado automaticamente)
const dbPath = path.resolve(__dirname, '..', 'data', 'sistema_tarefas.db');

// garante que a pasta exista
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco SQLite em', dbPath);
  }
});

function init() {
  db.serialize(() => {
    // ativa suporte a foreign keys
    db.run('PRAGMA foreign_keys = ON;');

    db.run(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT
      );
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS projetos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT
      );
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS categorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL
      );
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS tarefas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descricao TEXT,
        projetoId INTEGER,
        responsavelId INTEGER,
        categoriaId INTEGER,
        prioridade TEXT,
        status TEXT,
        criacao TEXT,
        prazo TEXT,
        FOREIGN KEY(projetoId) REFERENCES projetos(id),
        FOREIGN KEY(responsavelId) REFERENCES usuarios(id),
        FOREIGN KEY(categoriaId) REFERENCES categorias(id)
      );
    `);
  });
}

module.exports = { db, init };
