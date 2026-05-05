
---

# 🎵 Game Music – Guia Visual de Configuração

**Game Music** é um jogo de quiz musical feito em PHP, usando PostgreSQL e phpdotenv para gerenciamento seguro de variáveis de ambiente.

Este guia ensina **passo a passo** como configurar e rodar o projeto no Windows com XAMPP/WAMP, com um visual amigável para novos devs.

---

## 📂 Estrutura do Projeto

```text
game-music/
├─ php/
│   ├─ conexao.php
│   ├─ cadastro.php
│   ├─ login.php
│   ├─ home.php
│   └─ logout.php
├─ index.html
├─ composer.json
├─ composer.lock
├─ vendor/          <- Criado pelo Composer
├─ .env             <- Configurações pessoais (não versionar)
├─ .env.example     <- Modelo do .env
└─ banco/
    └─ quiz_musical.sql
```

---

## ⚙️ Passo 1 – Pré-requisitos

Antes de tudo, instale:

* ✅ [XAMPP](https://www.apachefriends.org/pt_br/index.html) ou WAMP
* ✅ PHP 8.2+ (vem com XAMPP/WAMP)
* ✅ PostgreSQL
* ✅ [Composer](https://getcomposer.org/download/)
* ✅ Git (opcional, mas recomendado)

> Certifique-se de que **Apache** e **PostgreSQL** estão rodando.

---

## 📥 Passo 2 – Clonar o Projeto

```bash
git clone https://github.com/seu_usuario/game-music.git
cd game-music
```

> Substitua pelo link real do repositório.

---

## 📦 Passo 3 – Instalar Dependências PHP

Dentro da **pasta raiz do projeto** (mesmo nível do `composer.json`):

```bash
composer install
```

O que acontece:

* Cria a pasta `vendor/`
* Instala phpdotenv e outras dependências
* Gera o autoload para PHP

> ⚠️ Não execute fora da raiz do projeto!

---

## 🔐 Passo 4 – Configurar Variáveis de Ambiente (.env)

1. Copie o modelo `.env.example`:

```bash
copy .env.example .env
```

2. Edite `.env` com os dados do PostgreSQL:

```env
DB_HOST=localhost
DB_NAME=quiz_musical
DB_USER=postgres
DB_PASS=sua_senha
```

> `.env` é pessoal, **não deve ser versionado no Git**.

---

## 🗄️ Passo 5 – Configurar Banco de Dados

### 5.1 Criar Banco

```sql
CREATE DATABASE quiz_musical;
```

### 5.2 Importar Arquivo SQL

* Pelo terminal:

```bash
psql -U postgres -d quiz_musical -f banco/quiz_musical.sql
```

* Ou dentro do psql:

```sql
\c quiz_musical
\i banco/quiz_musical.sql
```

### 5.3 Exportar Banco (opcional)

```bash
pg_dump -U seu_usuario -d quiz_musical -E UTF8 -f banco/quiz_musical.sql
```

> Útil para atualizar o SQL no Git após alterações.

---

## 🔌 Passo 6 – Testar Conexão PHP

Crie `php/teste.php`:

```php
<?php
require __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

echo "Host: " . $_ENV['DB_HOST'] . "<br>";
echo "Banco: " . $_ENV['DB_NAME'] . "<br>";
echo "Usuário: " . $_ENV['DB_USER'] . "<br>";
```

Acesse:

```
http://localhost/game-music/php/teste.php
```

✅ Valores corretos indicam que a conexão está funcionando.

---

## 🚀 Passo 7 – Rodar o Projeto

1. Coloque o projeto na pasta `htdocs` do XAMPP
2. Certifique que Apache e PostgreSQL estão ativos
3. Abra no navegador:

```
http://localhost/game-music/index.html
```

* Agora você pode cadastrar usuários, fazer login e jogar o quiz.

---

## 🧑‍💻 Fluxo Visual para Novos Devs

```text
[Clonar Repositório] → [Composer Install] → [Criar .env] → [Importar Banco] → [Testar Conexão] → [Rodar Projeto]
```

> Tudo feito em poucos minutos! ⚡

---

## 📌 Dicas e Boas Práticas

* Nunca versionar `.env` no Git
* Atualize sempre o `.env.example` com novas variáveis
* Use `composer update` apenas quando necessário
* Sempre verifique encoding UTF-8 no PostgreSQL
* Crie backups antes de alterar dados importantes

---

## 🧰 Comandos Úteis PostgreSQL

```sql
-- Listar bancos
\l

-- Conectar a um banco
\c quiz_musical

-- Listar tabelas
\dt

-- Ver estrutura de uma tabela
\d nome_da_tabela

-- Inserir dados
INSERT INTO tabela (col1, col2) VALUES ('valor1', 'valor2');

-- Atualizar dados
UPDATE tabela SET col1='novo_valor' WHERE id=1;

-- Deletar dados
DELETE FROM tabela WHERE id=1;

-- Limpar tabela
TRUNCATE TABLE tabela;
```

---

## 📌 Observações Finais

* Mantenha `.env.example` atualizado
* Sempre exporte o banco se modificar tabelas ou dados
* Este README serve como **guia completo para qualquer dev configurar e rodar o projeto rapidamente**

---

