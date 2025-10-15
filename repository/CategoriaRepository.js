const { db } = require('./Database');
const Categoria = require('../model/Categoria');

class CategoriaRepository {
  constructor() {}

  create(categoria) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO categorias (nome) VALUES (?)', [categoria.nome], function (err) {
        if (err) return reject(err);
        categoria.id = this.lastID;
        resolve(categoria);
      });
    });
  }

  list() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM categorias', [], (err, rows) => {
        if (err) return reject(err);
        const categorias = rows.map(r => new Categoria(r.id, r.nome));
        resolve(categorias);
      });
    });
  }

  update(id, novaCategoria) {
    return new Promise((resolve, reject) => {
      db.run('UPDATE categorias SET nome = ? WHERE id = ?', [novaCategoria.nome, id], function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM categorias WHERE id = ?', [id], function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM categorias WHERE id = ?', [id], (err, r) => {
        if (err) return reject(err);
        if (!r) return resolve(null);
        resolve(new Categoria(r.id, r.nome));
      });
    });
  }
}

module.exports = CategoriaRepository;
