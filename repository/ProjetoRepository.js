const { db } = require('./Database');
const Projeto = require('../model/Projeto');

class ProjetoRepository {
  constructor() {}

  create(projeto) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO projetos (nome, descricao) VALUES (?, ?)', [projeto.nome, projeto.descricao], function (err) {
        if (err) return reject(err);
        projeto.id = this.lastID;
        resolve(projeto);
      });
    });
  }

  list() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM projetos', [], (err, rows) => {
        if (err) return reject(err);
        const projetos = rows.map(r => new Projeto(r.id, r.nome, r.descricao));
        resolve(projetos);
      });
    });
  }

  update(id, novoProjeto) {
    return new Promise((resolve, reject) => {
      db.run('UPDATE projetos SET nome = ?, descricao = ? WHERE id = ?', [novoProjeto.nome, novoProjeto.descricao, id], function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM projetos WHERE id = ?', [id], function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM projetos WHERE id = ?', [id], (err, r) => {
        if (err) return reject(err);
        if (!r) return resolve(null);
        resolve(new Projeto(r.id, r.nome, r.descricao));
      });
    });
  }
}

module.exports = ProjetoRepository;
