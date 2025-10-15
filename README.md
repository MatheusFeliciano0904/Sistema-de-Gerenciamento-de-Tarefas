# Sistema de Gerenciamento de Tarefas

Um projeto simples em Node.js que demonstra um sistema de gerenciamento de tarefas usando SQLite como armazenamento local. O objetivo é ser um exemplo funcional para estudo e uso em pequenos projetos ou para a disciplina.

## O que este projeto faz

- Cria um banco de dados SQLite local (em `data/sistema_tarefas.db`).
- Possui modelos (`model/`), repositórios (`repository/`), serviços (`service/`) e uma interface de execução simples em `ui/Main.js` que popula e gera um relatório de tarefas.

## Pré-requisitos

- Node.js (versão 12+ recomendada).
- npm (vem com o Node.js).

Observação: As instruções abaixo usam PowerShell no Windows (o ambiente padrão detectado durante a criação deste README).

## Instalação

Abra o PowerShell na raiz do projeto e execute:

```powershell
# Instala as dependências definidas em package.json
npm install
```

Se ainda não existir `package.json` com a dependência do sqlite3 (este projeto já inclui `sqlite3`), você pode inicializar e instalar com:

```powershell
npm init -y; npm install sqlite3
```

## Como executar

O arquivo de entrada de exemplo é `ui/Main.js`. Ele inicializa o banco, cria exemplos de usuário, projeto, categoria e tarefas, e em seguida gera um relatório.

No PowerShell execute:

```powershell
node ui\Main.js
```

Você verá logs de conexão com o banco e os outputs gerados pelo serviço.

## Onde o banco de dados é salvo

O banco SQLite é criado automaticamente (se não existir) em:

```
data/sistema_tarefas.db
```

O arquivo é gerado pela função `init()` no arquivo `repository/Database.js`.

## Estrutura do projeto

- `model/` — classes de domínio: `Usuario.js`, `Projeto.js`, `Categoria.js`, `Tarefa.js`, `enums.js`.
- `repository/` — acesso ao banco: `Database.js`, `UsuarioRepository.js`, `ProjetoRepository.js`, `CategoriaRepository.js`, `TarefaRepository.js`.
- `service/` — lógica de negócio: `TarefaService.js`.
- `ui/` — ponto de entrada de exemplo: `Main.js`.
- `data/` — pasta onde o arquivo SQLite será salvo (criada automaticamente).

## Exemplos de uso

- Para adicionar mais dados manualmente, edite `ui/Main.js` ou crie scripts adicionais que utilizem os repositórios.

Exemplo básico (já presente em `ui/Main.js`):

- Inicializa o DB com `init()`.
- Cria um `Usuario`, `Projeto` e `Categoria`.
- Cria duas tarefas via `TarefaService` e gera um relatório.

## Desenvolvimento e contribuições

- Sinta-se à vontade para abrir issues ou enviar pull requests.
- Possíveis melhorias:
  - Implementar testes automatizados.
  - Substituir operações em memória por consultas usando `db` (se houver código ainda em memória).
  - Adicionar scripts npm para `start` e `test`.

## Scripts úteis (sugestão)

Você pode adicionar estes scripts ao `package.json` para facilitar:

```json
"scripts": {
  "start": "node ui/Main.js",
  "test": "echo \"No tests specified\" && exit 0"
}
```

Depois execute com `npm run start`.

