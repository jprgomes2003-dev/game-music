<?php
require __DIR__ . "/../conexao.php";
session_start();

header('Content-Type: application/json');

function resposta($status, $message) {
    echo json_encode([
        "status" => $status,
        "message" => $message
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$nome = $data['nome'] ?? '';
$email = $data['email'] ?? '';
$google_id = $data['google_id'] ?? '';

if (!$email || !$google_id) {
    resposta("error", "Dados inválidos");
}

try {

    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);

    $usuario = $stmt->fetch();

    if ($usuario) {

        // LOGIN
        $_SESSION['usuario_id'] = $usuario['id'];
        $_SESSION['nome'] = $usuario['nome'];

        resposta("success", "Login realizado com Google!");
    }

    // CADASTRA
    $stmt = $pdo->prepare("
        INSERT INTO usuarios (nome, email, google_id)
        VALUES (?, ?, ?)
    ");

    $stmt->execute([$nome, $email, $google_id]);

    $_SESSION['usuario_id'] = $pdo->lastInsertId();
    $_SESSION['nome'] = $nome;

    resposta("success", "Conta criada com Google!");

} catch (PDOException $e) {
    resposta("error", "Erro no servidor");
}