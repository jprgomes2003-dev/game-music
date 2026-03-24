<?php
require __DIR__ . "/conexao.php";

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

    if ($senha !== $confirmar_senha) {
        echo "Senhas não coincidem!";
        exit;
    }

    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    try {

        // verifica se email já existe
        $sql = "SELECT id FROM usuarios WHERE email = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email]);

        if ($stmt->rowCount() > 0) {
            echo "Email já cadastrado!";
            exit;
        }

        // insere usuário
        $sql = "INSERT INTO usuarios (nome, email, senha_hash, idade)
                VALUES (?, ?, ?, ?)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([$nome, $email, $senha_hash, $idade]);

        // redireciona com sucesso
        header("Location: ../../public/index.html?sucesso=1");
        exit;

    } catch (PDOException $e) {
        echo "Erro ao cadastrar!";
    }
}