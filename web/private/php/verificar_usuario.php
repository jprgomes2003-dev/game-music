<?php
require __DIR__ . "/conexao.php";

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$google_id = $data['google_id'] ?? '';

$sql = "SELECT id FROM usuarios WHERE google_id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$google_id]);

echo json_encode([
    "existe" => $stmt->rowCount() > 0
]);