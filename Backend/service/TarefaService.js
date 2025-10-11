const Tarefa = require("../model/Tarefa");
const { Status } = require("../model/enums");

class TarefaService {
  constructor(tarefaRepo, projetoRepo, usuarioRepo, categoriaRepo) {
    this.tarefaRepo = tarefaRepo;
    this.projetoRepo = projetoRepo;
    this.usuarioRepo = usuarioRepo;
    this.categoriaRepo = categoriaRepo;
  }

  criarTarefa(dados) {
    const projeto = this.projetoRepo.findById(dados.projetoId);
    const usuario = this.usuarioRepo.findById(dados.responsavelId);

    if (!projeto || !usuario) throw new Error("Projeto ou usuário inválido!");

    const tarefa = new Tarefa(
      null,
      dados.titulo,
      dados.descricao,
      dados.projetoId,
      dados.responsavelId,
      dados.categoriaId,
      dados.prioridade,
      dados.status,
      new Date(),
      new Date(dados.prazo)
    );

    this.tarefaRepo.create(tarefa);
  }

  listarTarefas() {
    return this.tarefaRepo.list();
  }

  atualizarTarefa(id, dados) {
    this.tarefaRepo.update(id, dados);
  }

  excluirTarefa(id) {
    this.tarefaRepo.delete(id);
  }

  gerarRelatorio() {
    const tarefas = this.tarefaRepo.list();
    const hoje = new Date();

    const porStatus = {
      "A FAZER": [],
      "FAZENDO": [],
      "FEITO": []
    };

    tarefas.forEach(t => porStatus[t.status].push(t));

    const vencidas = tarefas.filter(t => new Date(t.prazo) < hoje && t.status !== Status.FEITO);

    const resumoProjetos = {};
    const resumoUsuarios = {};

    tarefas.forEach(t => {
      resumoProjetos[t.projetoId] = (resumoProjetos[t.projetoId] || 0) + 1;
      resumoUsuarios[t.responsavelId] = (resumoUsuarios[t.responsavelId] || 0) + 1;
    });

    console.log("=== RELATÓRIO ===");
    console.log("\nTarefas por Status:");
    for (let s in porStatus)
      console.log(`${s}: ${porStatus[s].length}`);

    console.log("\nTarefas vencidas:");
    vencidas.forEach(t => console.log(`- ${t.titulo} (prazo: ${t.prazo.toLocaleDateString()})`));

    console.log("\nResumo por Projeto:");
    for (let p in resumoProjetos)
      console.log(`Projeto ${p}: ${resumoProjetos[p]} tarefa(s)`);

    console.log("\nResumo por Usuário:");
    for (let u in resumoUsuarios)
      console.log(`Usuário ${u}: ${resumoUsuarios[u]} tarefa(s)`);
  }
}

module.exports = TarefaService;
