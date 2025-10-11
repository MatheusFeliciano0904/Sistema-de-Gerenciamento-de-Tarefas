const Usuario = require("../model/Usuario");
const Projeto = require("../model/Projeto");
const Categoria = require("../model/Categoria");
const UsuarioRepository = require("../repository/UsuarioRepository");
const ProjetoRepository = require("../repository/ProjetoRepository");
const CategoriaRepository = require("../repository/CategoriaRepository");
const TarefaRepository = require("../repository/TarefaRepository");
const TarefaService = require("../service/TarefaService");
const { Prioridade, Status } = require("../model/enums");

function main() {
  const usuarioRepo = new UsuarioRepository();
  const projetoRepo = new ProjetoRepository();
  const categoriaRepo = new CategoriaRepository();
  const tarefaRepo = new TarefaRepository();

  const tarefaService = new TarefaService(tarefaRepo, projetoRepo, usuarioRepo, categoriaRepo);

  // Criar usuários, projetos e categoriasdsa
  const u1 = new Usuario(null, "Matheus", "vitheusciano34240904@gmail.com");
  usuarioRepo.create(u1);

  const u2 = new Usuario(null, "Maria", "maria0904@gmail.com");
  usuarioRepo.create(u2);

  const p1 = new Projeto(null, "Linguagem 3", "Atividade de Nivelamento");
  projetoRepo.create(p1);

  const c1 = new Categoria(null, "Back-end");
  categoriaRepo.create(c1);

  // Criar tarefas
  tarefaService.criarTarefa({
    titulo: "Implementar API",
    descricao: "Criar endpoints REST",
    projetoId: p1.id,
    responsavelId: u1.id,
    categoriaId: c1.id,
    prioridade: Prioridade.ALTA,
    status: Status.A_FAZER,
    prazo: "2025-10-09"
  });

  tarefaService.criarTarefa({
    titulo: "Testar API",
    descricao: "Realizar testes unitários",
    projetoId: p1.id,
    responsavelId: u2.id,
    categoriaId: c1.id,
    prioridade: Prioridade.MEDIA,
    status: Status.A_FAZER,
    prazo: "2025-10-12"
  });

  // Exibir relatório
  tarefaService.gerarRelatorio();
}

main();
