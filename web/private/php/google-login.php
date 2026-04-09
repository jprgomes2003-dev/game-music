<?php
ini_set('display_errors', 1); 
error_reporting(E_ALL);
header("Content-Type: application/json");

require __DIR__ . "/conexao.php";
session_start();

$data = json_decode(file_get_contents("php://input"), true);

$nome = $data['nome'] ?? '';
$email = $data['email'] ?? '';
$google_id = $data['google_id'] ?? '';

if (!$email) {
    echo json_encode(["status" => "error", "message" => "Email inválido"]);
    exit;
}

try {

    $sql = "SELECT id, nome FROM usuarios WHERE email = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$email]);

    if ($stmt->rowCount() > 0) {

        $usuario = $stmt->fetch();

    } else {

        // 👇 cuidado com campos obrigatórios
        $sql = "INSERT INTO usuarios (nome, email, senha_hash)
                VALUES (?, ?, '')";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([$nome, $email]);

        $usuario = [
            "id" => $pdo->lastInsertId(),
            "nome" => $nome
        ];
    }

    $_SESSION['usuario_id'] = $usuario['id'];
    $_SESSION['nome'] = $usuario['nome'];

    echo json_encode([
        "status" => "success",
        "message" => "Login com Google OK"
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage() 
    ]);
}