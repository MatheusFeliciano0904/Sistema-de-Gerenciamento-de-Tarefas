class ProjetoRepository {
  constructor() {
    this.projetos = [];
    this.proximoId = 1;
  }

  create(projeto) {
    projeto.id = this.proximoId++;
    this.projetos.push(projeto);
  }

  list() {
    return this.projetos;
  }

  update(id, novoProjeto) {
    const index = this.projetos.findIndex(p => p.id === id);
    if (index !== -1) this.projetos[index] = { id, ...novoProjeto };
  }

  delete(id) {
    this.projetos = this.projetos.filter(p => p.id !== id);
  }

  findById(id) {
    return this.projetos.find(p => p.id === id);
  }
}

module.exports = ProjetoRepository;
