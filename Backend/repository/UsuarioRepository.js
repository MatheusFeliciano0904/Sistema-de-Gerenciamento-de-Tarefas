class UsuarioRepository {
  constructor() {
    this.usuarios = [];
    this.proximoId = 1;
  }

  create(usuario) {
    usuario.id = this.proximoId++;
    this.usuarios.push(usuario);
  }

  list() {
    return this.usuarios;
  }

  update(id, novoUsuario) {
    const index = this.usuarios.findIndex(u => u.id === id);
    if (index !== -1) this.usuarios[index] = { id, ...novoUsuario };
  }

  delete(id) {
    this.usuarios = this.usuarios.filter(u => u.id !== id);
  }

  findById(id) {
    return this.usuarios.find(u => u.id === id);
  }
}

module.exports = UsuarioRepository;
