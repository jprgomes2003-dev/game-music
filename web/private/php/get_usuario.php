<?php
session_start();
header('Content-Type: application/json');
require __DIR__ . "/conexao.php";

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["error" => "Não autenticado"]);
    exit;
}

$id = $_SESSION['usuario_id'];

$sql = "SELECT nome, email, senha_hash, data_nascimento FROM usuarios WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);

$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$usuario) {
    echo json_encode(["error" => "Usuário não encontrado"]);
    exit;
}

echo json_encode([
    "nome" => $usuario['nome'],
    "email" => $usuario['email'],
    "data_nascimento" => $usuario['data_nascimento'],
    "tem_senha" => !empty($usuario['senha_hash'])
]);