# 🎵 Quiz Musical - Sistema de Autenticação

Este projeto implementa um sistema simples de cadastro, login e controle de sessão utilizando PHP e PostgreSQL.

---

## 📁 Estrutura dos Arquivos

* `conexao.php` → Conexão com o banco de dados
* `cadastro.php` → Registro de novos usuários
* `login.php` → Autenticação de usuários
* `home.php` → Área protegida (após login)
* `logout.php` → Encerramento de sessão

---

## 🔌 conexao.php

Responsável por estabelecer a conexão com o banco de dados utilizando PDO.

### 🔹 Configuração

```php
// Template para configuração do banco
require __DIR__ . '/../vendor/autoload.php'; // acessa autoload na raiz

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..'); // aponta para a raiz
$dotenv->load();

$host = $_ENV['DB_HOST'];
$db   = $_ENV['DB_NAME'];
$user = $_ENV['DB_USER'];
$pass = $_ENV['DB_PASS'];

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


} catch (PDOException $e) {
    echo "❌ Erro na conexão: " . $e->getMessage();
}

?>;
```

Define os dados de acesso ao banco.

### 🔹 Conexão

```php
$pdo = new PDO("pgsql:host=$host;dbname=$db", $user, $pass);
```

Cria a conexão com o PostgreSQL.

### 🔹 Tratamento de erros

```php
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
```

Configura o PDO para lançar exceções em caso de erro.

```php
catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
}
```

Captura e exibe erros de conexão.

---

## 📝 cadastro.php

Responsável por cadastrar novos usuários.

### 🔹 Importação

```php
require "conexao.php";
```

Inclui a conexão com o banco.

### 🔹 Verificação de requisição

```php
if ($_SERVER["REQUEST_METHOD"] == "POST")
```

Garante que o código execute apenas via formulário.

---

### 📥 Recebimento de dados

```php
$nome = $_POST['nome'] ?? '';
```

Captura os dados enviados (com valor padrão para evitar erros).

---

### ✅ Validações

* Campos obrigatórios:

```php
if (empty(...))
```

* Idade válida:

```php
if ($idade < 10 || $idade > 120)
```

* Senhas iguais:

```php
if ($senha !== $confirmar_senha)
```

---

### 🔐 Segurança

```php
$senha_hash = password_hash($senha, PASSWORD_DEFAULT);
```

Criptografa a senha antes de salvar.

---

### 🔎 Verificação de email

```php
SELECT id FROM usuarios WHERE email = ?
```

Evita cadastro duplicado.

---

### 💾 Inserção no banco

```php
INSERT INTO usuarios (nome, email, senha_hash, idade)
```

Salva o usuário no banco com segurança (prepared statements).

---

### 📧 Email

```php
@mail($email, $assunto, $mensagem, $headers);
```

Envia um email de boas-vindas (opcional).

---

### 🔁 Redirecionamento

```php
header("Location: ../index.html?sucesso=1");
```

Redireciona após sucesso.

---

### ⚠️ Erros

```php
error_log(...)
```

Registra erros no servidor.

---

## 🔐 login.php

Responsável pela autenticação do usuário.

### 🔹 Sessão

```php
session_start();
```

Inicia o controle de sessão.

---

### 📥 Dados

```php
$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';
```

Recebe os dados do formulário.

---

### ✅ Validação

```php
if (empty($email) || empty($senha))
```

Verifica campos obrigatórios.

---

### 🔎 Consulta

```php
SELECT * FROM usuarios WHERE email = ?
```

Busca o usuário no banco.

---

### 🔐 Verificação de senha

```php
password_verify($senha, $usuario['senha_hash'])
```

Confere se a senha está correta.

---

### 🧠 Sessão

```php
$_SESSION['usuario_id'] = $usuario['id'];
$_SESSION['nome'] = $usuario['nome'];
```

Armazena dados do usuário.

---

### 🔁 Redirecionamento

```php
header("Location: home.php");
```

Leva o usuário para a área protegida.

---

## 🏠 home.php

Página acessível apenas para usuários logados.

### 🔹 Verificação

```php
if (!isset($_SESSION['usuario_id']))
```

Impede acesso não autorizado.

---

### 👋 Exibição

```php
echo $_SESSION['nome'];
```

Mostra o nome do usuário.

---

## 🚪 logout.php

Responsável por encerrar a sessão do usuário.

### 🔹 Encerramento

```php
session_destroy();
```

Remove todos os dados da sessão.

---

### 🔁 Redirecionamento

```php
header("Location: ../index.html");
```

Retorna para a página inicial.

---

## ✅ Funcionalidades

✔ Cadastro de usuários
✔ Validação de dados
✔ Criptografia de senha
✔ Login seguro
✔ Controle de sessão
✔ Logout

---

## ⚠️ Observações

* Nunca armazene senhas em texto puro
* Utilize prepared statements para evitar SQL Injection
* Em produção, configure corretamente o envio de emails
* Proteja arquivos sensíveis (como `conexao.php`)

---

## 🚀 Melhorias futuras

* Recuperação de senha
* Validação de email
* Sistema de níveis no quiz
* Interface mais amigável

---
