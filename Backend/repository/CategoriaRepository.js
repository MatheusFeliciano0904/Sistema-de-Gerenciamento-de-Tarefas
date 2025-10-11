class CategoriaRepository {
  constructor() {
    this.categorias = [];
    this.proximoId = 1;
  }

  create(categoria) {
    categoria.id = this.proximoId++;
    this.categorias.push(categoria);
  }

  list() {
    return this.categorias;
  }

  update(id, novaCategoria) {
    const index = this.categorias.findIndex(c => c.id === id);
    if (index !== -1) this.categorias[index] = { id, ...novaCategoria };
  }

  delete(id) {
    this.categorias = this.categorias.filter(c => c.id !== id);
  }

  findById(id) {
    return this.categorias.find(c => c.id === id);
  }
}

module.exports = CategoriaRepository;
