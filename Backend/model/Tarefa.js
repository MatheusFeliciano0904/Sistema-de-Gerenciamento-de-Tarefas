const { Prioridade, Status } = require('./enums');

class Tarefa {
  constructor(id, titulo, descricao, projetoId, responsavelId, categoriaId, prioridade, status, criacao, prazo) {
    if (!titulo || !projetoId || !responsavelId) {
      throw new Error("Título, projeto e responsável são obrigatórios!");
    }

    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.projetoId = projetoId;
    this.responsavelId = responsavelId;
    this.categoriaId = categoriaId;
    this.prioridade = prioridade || Prioridade.MEDIA;
    this.status = status || Status.A_FAZER;
    this.criacao = criacao || new Date();
    this.prazo = prazo;
  }
}

module.exports = Tarefa;
