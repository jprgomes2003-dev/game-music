<?php
require "conexao.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $senha = $_POST['senha'] ?? '';
    $confirmar_senha = $_POST['confirmar_senha'] ?? '';
    $idade = $_POST['idade'] ?? 0;

    if (empty($nome) || empty($email) || empty($senha) || empty($confirmar_senha) || empty($idade)) {
        echo "Preencha todos os campos!";
        exit;
    }

    if ($idade < 10 || $idade > 120) {
        echo "Idade inválida!";
        exit;
    }

    if ($senha !== $confirmar_senha) {
        echo "As senhas não coincidem!";
        exit;
    }

    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    try {

        $sql = "SELECT id FROM usuarios WHERE email = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email]);

        if ($stmt->rowCount() > 0) {
            echo "Email já cadastrado!";
            exit;
        }

        $sql = "INSERT INTO usuarios (nome, email, senha_hash, idade) VALUES (?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$nome, $email, $senha_hash, $idade]);

        //  envio de email (mantido)
        $assunto = "Cadastro realizado com sucesso!";

        $mensagem = "
        Olá $nome,

        Seu cadastro foi realizado com sucesso!

        Seja bem-vindo(a) ao nosso jogo Quiz Musical 🎵
        ";

        $headers = "From: no-reply@seudominio.com\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        @mail($email, $assunto, $mensagem, $headers);

        //  REDIRECIONAMENTO
        header("Location: ../index.html?sucesso=1");
    exit;

    } catch (PDOException $e) {

        error_log("Erro no cadastro: " . $e->getMessage());
        echo "Erro ao cadastrar! Tente novamente.";
    }
}
?>