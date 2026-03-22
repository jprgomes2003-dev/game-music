<?php
require "conexao.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // receber dados do formulário
    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $senha = $_POST['senha'] ?? '';
    $confirmar_senha = $_POST['confirmar_senha'] ?? '';
    $idade = $_POST['idade'] ?? 0;

    // validação básica
    if (empty($nome) || empty($email) || empty($senha) || empty($confirmar_senha) || empty($idade)) {
        echo "Preencha todos os campos!";
        exit;
    }

    // validar idade
    if ($idade < 10 || $idade > 120) {
        echo "Idade inválida!";
        exit;
    }

    // validar confirmação de senha
    if ($senha !== $confirmar_senha) {
        echo "As senhas não coincidem!";
        exit;
    }

    // criptografar senha
    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    try {

        // verificar se email já existe
        $sql = "SELECT id FROM usuarios WHERE email = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email]);

        if ($stmt->rowCount() > 0) {
            echo "Email já cadastrado!";
            exit;
        }

        // inserir usuário
        $sql = "INSERT INTO usuarios (nome, email, senha_hash, idade) VALUES (?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$nome, $email, $senha_hash, $idade]);

        echo "Cadastro realizado com sucesso!";

    } catch (PDOException $e) {

        // log interno (não aparece para o usuário)
        error_log("Erro no cadastro: " . $e->getMessage());

        // mensagem amigável
        echo "Erro ao cadastrar! Tente novamente.";
    }
}
?>