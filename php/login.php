<?php
require "conexao.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // receber dados
    $email = $_POST['email'] ?? '';
    $senha = $_POST['senha'] ?? '';

    // validação básica
    if (empty($email) || empty($senha)) {
        echo "Preencha todos os campos!";
        exit;
    }

    try {

        // buscar usuário
        $sql = "SELECT * FROM usuarios WHERE email = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email]);

        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        // verificar login
        if ($usuario && password_verify($senha, $usuario['senha_hash'])) {

            // criar sessão
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['nome'] = $usuario['nome'];

            // redirecionar
            header("Location: home.php");
            exit;

        } else {
            echo "Email ou senha inválidos!";
        }

    } catch (PDOException $e) {
        echo "Erro no login: " . $e->getMessage();
    }
}
?>