class TarefaRepository {
  constructor() {
    this.tarefas = [];
    this.proximoId = 1;
  }

  create(tarefa) {
    tarefa.id = this.proximoId++;
    this.tarefas.push(tarefa);
  }

  list() {
    return this.tarefas;
  }

  update(id, novaTarefa) {
    const index = this.tarefas.findIndex(t => t.id === id);
    if (index !== -1) this.tarefas[index] = { id, ...novaTarefa };
  }

  delete(id) {
    this.tarefas = this.tarefas.filter(t => t.id !== id);
  }

  findById(id) {
    return this.tarefas.find(t => t.id === id);
  }
}

module.exports = TarefaRepository;
