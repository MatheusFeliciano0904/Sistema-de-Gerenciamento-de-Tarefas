==================================== Sistema de Gerenciamento de Tarefas ====================================

Objetivo
  • Modelagem OO (classes, enums, relacionamentos);
  • Camadas (domínio, repositório, serviço, UI);
  • Boas práticas (encapsulamento, validações, coesão);
  • Operações CRUD completas;
  • Leitura/escrita simples em console e geração de relatório em tela.

Escopo: 
  Implemente quatro CRUDs completos (Create, Read/List, Update, Delete) para:
  1. Usuário (quem executa/recebe tarefas);
  2. Projeto (agrupa tarefas);
  3. Categoria (classifica tarefas); e
  4. Tarefa (entidade principal).
  E gere um relatório básico em tela com:
  • Tarefas por Status (A FAZER, FAZENDO E FEITO), com contagem e listagem;
  • Tarefas vencidas (prazo < hoje); e
  • Resumo por Projeto e por Usuário (quantidades).

```
sistema-tarefas/
├── model/
│   ├── Usuario.js
│   ├── Projeto.js
│   ├── Categoria.js
│   ├── Tarefa.js
│   ├── enums.js
│
├── repository/
│   ├── UsuarioRepository.js
│   ├── ProjetoRepository.js
│   ├── CategoriaRepository.js
│   ├── TarefaRepository.js
│
├── service/
│   ├── UsuarioService.js
│   ├── ProjetoService.js
│   ├── CategoriaService.js
│   ├── TarefaService.js
│
├── ui/
│   └── Main.js
│
└── app.js
```


==================================== Modo de Execução ===================================

💻 2. Abrir no VS Code

Abra o Visual Studio Code
Vá em File → Open Folder...
Selecione a pasta que você acabou de extrair (sistema-tarefas)
Clique em “Open”

⚙️ 3. Verificar o Node.js

Abra o terminal do VS Code (atalho: Ctrl + ')
Digite o comando abaixo pra garantir que o Node está instalado:

node -v
(Se aparecer algo como v18.17.0 ou superior ✅ está tudo certo)

🚀 4. Executar o sistema

No terminal do VS Code (dentro da pasta sistema-tarefas), digite:

node ui/Menu.js











