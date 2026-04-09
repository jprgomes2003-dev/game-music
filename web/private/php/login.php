<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

require __DIR__ . "/conexao.php";
header('Content-Type: application/json');

session_start();

function resposta($status, $message) {
    echo json_encode([
        "status" => $status,
        "message" => $message
    ]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = $_POST['email'] ?? '';
    $senha = $_POST['senha'] ?? '';

    if (empty($email) || empty($senha)) {
        resposta("error", "Preencha todos os campos!");
    }

    try {

        $sql = "SELECT * FROM usuarios WHERE email = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email]);

        $usuario = $stmt->fetch();

        if (!$usuario) {
            resposta("error", "Usuário não encontrado!");
        }

        if (!password_verify($senha, $usuario['senha_hash'])) {
            resposta("error", "Senha incorreta!");
        }

   
        $_SESSION['usuario_id'] = $usuario['id'];
        $_SESSION['nome'] = $usuario['nome'];

        resposta("success", "Login realizado com sucesso!");

    } catch (PDOException $e) {
        resposta("error", "Erro no servidor!");
    }
}