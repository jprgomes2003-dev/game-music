<?php
session_start();
header('Content-Type: application/json');
$raw = file_get_contents("php://input");
require __DIR__ . "/conexao.php";

$data = json_decode(file_get_contents("php://input"), true);

$google_id = $data['google_id'] ?? null;
$email = $data['email'] ?? null;

// 🔒 VALIDAÇÃO
if (!$google_id || !$email) {
    echo json_encode([
        "status" => "error",
        "message" => "Dados inválidos"
    ]);
    exit;
}

try {

    // 🔍 PROCURA POR GOOGLE_ID OU EMAIL
    $sql = "SELECT id, nome, google_id FROM usuarios WHERE google_id = ? OR email = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$google_id, $email]);

    if ($stmt->rowCount() > 0) {

        $usuario = $stmt->fetch();

        // 🔗 VINCULA GOOGLE_ID SE NÃO EXISTIR
        if (empty($usuario['google_id'])) {
            $update = $pdo->prepare("UPDATE usuarios SET google_id = ? WHERE id = ?");
            $update->execute([$google_id, $usuario['id']]);
        }

        // 🔐 LOGIN
        $_SESSION['usuario_id'] = $usuario['id'];
        $_SESSION['nome'] = $usuario['nome'];

        echo json_encode(["status" => "success"]);
        exit;

    } else {

        // 👤 NOVO USUÁRIO
        $_SESSION['google_temp'] = [
    "google_id" => $google_id,
    "email" => $email
];

echo json_encode(["status" => "novo"]);
exit;
    }

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Erro interno"
    ]);
}