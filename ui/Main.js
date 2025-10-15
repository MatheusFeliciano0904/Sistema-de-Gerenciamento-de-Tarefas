const Usuario = require("../model/Usuario");
const Projeto = require("../model/Projeto");
const Categoria = require("../model/Categoria");
const UsuarioRepository = require("../repository/UsuarioRepository");
const ProjetoRepository = require("../repository/ProjetoRepository");
const CategoriaRepository = require("../repository/CategoriaRepository");
const TarefaRepository = require("../repository/TarefaRepository");
const TarefaService = require("../service/TarefaService");
const { Prioridade, Status } = require("../model/enums");
const { init } = require('../repository/Database');

async function main() {
  // Inicializa o banco SQLite (cria arquivo e tabelas se necessário)
  init();

  const usuarioRepo = new UsuarioRepository();
  const projetoRepo = new ProjetoRepository();
  const categoriaRepo = new CategoriaRepository();
  const tarefaRepo = new TarefaRepository();

  const tarefaService = new TarefaService(tarefaRepo, projetoRepo, usuarioRepo, categoriaRepo);

  // Criar usuários, projetos e categorias (implementações em memória por enquanto)
  const u1 = new Usuario(null, "Matheus", "matheus@email");
  await usuarioRepo.create(u1);

  const p1 = new Projeto(null, "Sistema Web", "Projeto final da faculdade");
  await projetoRepo.create(p1);

  const c1 = new Categoria(null, "Back-end");
  await categoriaRepo.create(c1);

  // Criar tarefas usando o serviço — agora retorna Promises internamente
  await tarefaService.criarTarefa({
    titulo: "Implementar API",
    descricao: "Criar endpoints REST",
    projetoId: p1.id,
    responsavelId: u1.id,
    categoriaId: c1.id,
    prioridade: Prioridade.ALTA,
    status: Status.A_FAZER,
    prazo: "2025-10-15"
  });

  await tarefaService.criarTarefa({
    titulo: "Testar API",
    descricao: "Realizar testes unitários",
    projetoId: p1.id,
    responsavelId: u1.id,
    categoriaId: c1.id,
    prioridade: Prioridade.MEDIA,
    status: Status.FAZENDO,
    prazo: "2025-10-05"
  });

  // Exibir relatório (assume que gerarRelatorio lida com operações assíncronas internamente)
  await tarefaService.gerarRelatorio();
}

main().catch(err => console.error('Erro no main:', err));
