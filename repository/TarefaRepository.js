const { db } = require('./Database');
const Tarefa = require('../model/Tarefa');

class TarefaRepository {
  constructor() {}

  create(tarefa) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO tarefas (titulo, descricao, projetoId, responsavelId, categoriaId, prioridade, status, criacao, prazo)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const params = [
        tarefa.titulo,
        tarefa.descricao,
        tarefa.projetoId,
        tarefa.responsavelId,
        tarefa.categoriaId,
        tarefa.prioridade,
        tarefa.status,
        tarefa.criacao ? tarefa.criacao.toISOString() : new Date().toISOString(),
        tarefa.prazo || null
      ];

      db.run(sql, params, function (err) {
        if (err) return reject(err);
        tarefa.id = this.lastID;
        resolve(tarefa);
      });
    });
  }

  list() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM tarefas', [], (err, rows) => {
        if (err) return reject(err);
        const tarefas = rows.map(r => new Tarefa(
          r.id,
          r.titulo,
          r.descricao,
          r.projetoId,
          r.responsavelId,
          r.categoriaId,
          r.prioridade,
          r.status,
          r.criacao ? new Date(r.criacao) : null,
          r.prazo
        ));
        resolve(tarefas);
      });
    });
  }

  update(id, novaTarefa) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE tarefas SET titulo = ?, descricao = ?, projetoId = ?, responsavelId = ?, categoriaId = ?, prioridade = ?, status = ?, criacao = ?, prazo = ? WHERE id = ?`;
      const params = [
        novaTarefa.titulo,
        novaTarefa.descricao,
        novaTarefa.projetoId,
        novaTarefa.responsavelId,
        novaTarefa.categoriaId,
        novaTarefa.prioridade,
        novaTarefa.status,
        novaTarefa.criacao ? novaTarefa.criacao.toISOString() : null,
        novaTarefa.prazo || null,
        id
      ];

      db.run(sql, params, function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM tarefas WHERE id = ?', [id], function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM tarefas WHERE id = ?', [id], (err, r) => {
        if (err) return reject(err);
        if (!r) return resolve(null);
        const tarefa = new Tarefa(
          r.id,
          r.titulo,
          r.descricao,
          r.projetoId,
          r.responsavelId,
          r.categoriaId,
          r.prioridade,
          r.status,
          r.criacao ? new Date(r.criacao) : null,
          r.prazo
        );
        resolve(tarefa);
      });
    });
  }
}

module.exports = TarefaRepository;
