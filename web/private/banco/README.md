# 📂 Banco de Dados (PostgreSQL)

O arquivo do banco está localizado em:

```bash
/banco/quiz_musical.sql
```

---

## 🛠️ Como importar o banco

### 1️⃣ Acessar a pasta do projeto

```bash
cd game-music
```

### 2️⃣ Entrar na pasta do banco

```bash
cd banco
```

---

### 3️⃣ Criar o banco de dados

Abra o PostgreSQL:

```bash
psql -U seu_usuario
```

E crie o banco:

```sql
CREATE DATABASE quiz_musical;
```

Ou direto pelo terminal:

```bash
createdb -U postgres quiz_musical
```

---

### 4️⃣ Importar o arquivo `.sql`

#### ✅ Opção 1 — Pelo terminal

```bash
psql -U seu_usuario -d quiz_musical -f banco/arquivo.sql
```

#### ✅ Opção 2 — Dentro do psql

```bash
psql -U seu_usuario -d quiz_musical
```

Depois execute:

```sql
\i banco/arquivo.sql
```

---

## 📌 Observações

* Substitua `seu_usuario` pelo seu usuário do PostgreSQL
* Certifique-se de que o banco `quiz_musical` já foi criado
* O arquivo `.sql` contém:

  * Estrutura das tabelas
  * Dados iniciais (se houver)

---

### 💡 Exemplo completo

```bash
createdb -U seu_usuario quiz_musical
psql -U seu_usuario -d quiz_musical -f banco/arquivo.sql
```

---

# 📤 Exportando o Banco de Dados (UTF-8)

Para gerar um arquivo `.sql` com codificação **UTF-8**:

## 🛠️ Comando

```bash
pg_dump -U seu_usuario -d quiz_musical -E UTF8 -f banco/arquivo.sql
```

---

## 📂 Explicação do comando

* `pg_dump` → ferramenta de exportação
* `-U seu_usuario` → usuário do banco
* `-d quiz_musical` → banco de dados
* `-E UTF8` → encoding UTF-8
* `-f banco/arquivo.sql` → arquivo de saída

---

## 📌 Passo a passo

1. Abra o terminal
2. Vá até o projeto:

```bash
cd game-music
cd banco
```

3. Execute:

```bash
pg_dump -U seu_usuario -d quiz_musical -E UTF8 -f arquivo.sql
```

---

## 📤 Exportar apenas estrutura (sem dados)

```bash
pg_dump -U seu_usuario -d quiz_musical --schema-only -E UTF8 -f arquivo.sql
```

---

## ⚠️ Observações importantes

* A pasta `banco` deve existir
* O arquivo será sobrescrito
* O banco deve estar em UTF-8

---

## 💡 Verificar encoding

Dentro do `psql`:

```sql
SHOW server_encoding;
```

Resultado esperado:

```text
UTF8
```

---

# 🔄 Atualizando o Arquivo do Banco

O arquivo `.sql` **não atualiza automaticamente**.

---

## 🛠️ Passo a passo

### 1️⃣ Abrir o terminal

### 2️⃣ Ir até o projeto

```bash
cd game-music
cd banco
```

### 3️⃣ Executar exportação

```bash
pg_dump -U seu_usuario -d quiz_musical -E UTF8 -f arquivo.sql
```

---

## 📌 O que acontece

* Gera uma nova versão do banco
* Substitui o arquivo anterior
* Mantém o projeto atualizado

---

## ⚠️ Importante

Execute sempre após:

* Criar tabelas
* Alterar estrutura
* Inserir dados importantes

---

## 💾 Atualizando no Git

```bash
git add banco/arquivo.sql
git commit -m "Atualiza banco de dados"
git push origin branch
```

---

## 💡 Dica

Mantenha o `.sql` atualizado para facilitar o uso por outros desenvolvedores.

---

# 🗄️ Comandos Básicos do PostgreSQL

## ▶️ Acessar

```bash
psql -U seu_usuario
```

---

## 📌 Listar bancos

```sql
\l
```

---

## 🆕 Criar banco

```sql
CREATE DATABASE quiz_musical;
```

---

## 🔌 Conectar

```sql
\c quiz_musical
```

---

## 📂 Listar tabelas

```sql
\dt
```

---

## 🔍 Estrutura da tabela

```sql
\d nome_da_tabela
```

---

## ➕ Inserir dados

```sql
INSERT INTO nome_da_tabela (coluna1, coluna2)
VALUES ('valor1', 'valor2');
```

---

## 📖 Consultar dados

```sql
SELECT * FROM nome_da_tabela;
```

---

## ✏️ Atualizar dados

```sql
UPDATE nome_da_tabela
SET coluna1 = 'novo_valor'
WHERE id = 1;
```

---

## ❌ Deletar dados

```sql
DELETE FROM nome_da_tabela
WHERE id = 1;
```

---

## 🗑️ Deletar tabela

```sql
DROP TABLE nome_da_tabela;
```

---

## 🧹 Limpar tabela

```sql
TRUNCATE TABLE nome_da_tabela;
```

---

## 🚪 Sair

```sql
\q
```

---

## ⚠️ Dica importante

> Sempre use `WHERE` em `UPDATE` e `DELETE` para evitar alterar ou apagar todos os dados.

---
