const { db } = require('./Database');
const Usuario = require('../model/Usuario');

class UsuarioRepository {
  constructor() {}

  create(usuario) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
      db.run(sql, [usuario.nome, usuario.email], function (err) {
        if (err) return reject(err);
        usuario.id = this.lastID;
        resolve(usuario);
      });
    });
  }

  list() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM usuarios', [], (err, rows) => {
        if (err) return reject(err);
        const usuarios = rows.map(r => new Usuario(r.id, r.nome, r.email));
        resolve(usuarios);
      });
    });
  }

  update(id, novoUsuario) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?';
      db.run(sql, [novoUsuario.nome, novoUsuario.email, id], function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM usuarios WHERE id = ?', [id], function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM usuarios WHERE id = ?', [id], (err, r) => {
        if (err) return reject(err);
        if (!r) return resolve(null);
        resolve(new Usuario(r.id, r.nome, r.email));
      });
    });
  }
}

module.exports = UsuarioRepository;
