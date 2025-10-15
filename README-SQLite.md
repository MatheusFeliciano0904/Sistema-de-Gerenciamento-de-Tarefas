Instruções para usar SQLite com este projeto

1) Instalar dependência (PowerShell):

   # Instala sqlite3 localmente
   npm init -y; npm install sqlite3

2) Executar o `Main.js` com Node:

   node ui\Main.js

3) Local do arquivo de banco de dados:

   O arquivo será criado em `data/sistema_tarefas.db` na raiz do projeto.

4) Próximos passos (opcional):

   - Adaptar os repositórios para usar `repository/Database.js` exportando `db`.
   - Trocar as operações em memória por consultas `db.run`, `db.get`, `db.all`.
