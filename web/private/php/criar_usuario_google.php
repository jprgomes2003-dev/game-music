<?php
session_start();
header('Content-Type: application/json');

require __DIR__ . "/conexao.php";

// 🔒 VERIFICA SE EXISTE SESSÃO TEMP DO GOOGLE
if (!isset($_SESSION['google_temp'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Sessão inválida"
    ]);
    exit;
}

// 📥 DADOS DO FRONT
$data = json_decode(file_get_contents("php://input"), true);

$nome = trim($data['nome'] ?? '');

if (!$nome) {
    echo json_encode([
        "status" => "error",
        "message" => "Nome obrigatório"
    ]);
    exit;
}

// 📌 DADOS DA SESSÃO TEMP
$google_id = $_SESSION['google_temp']['google_id'];
$email = $_SESSION['google_temp']['email'];

try {

    // 🔍 VERIFICA SE EMAIL JÁ EXISTE
    $check = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
    $check->execute([$email]);

    if ($check->rowCount() > 0) {
        echo json_encode([
            "status" => "error",
            "message" => "Email já cadastrado"
        ]);
        exit;
    }

    // 💾 INSERE NOVO USUÁRIO
    $sql = "INSERT INTO usuarios (nome, email, google_id) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nome, $email, $google_id]);

    $idCriado = $pdo->lastInsertId();

    // 🔐 CRIA SESSÃO REAL
    $_SESSION['usuario_id'] = $idCriado;
    $_SESSION['nome'] = $nome;

    // 🧹 LIMPA SESSÃO TEMP
    unset($_SESSION['google_temp']);

    echo json_encode([
        "status" => "success"
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Erro ao criar usuário"
    ]);
}