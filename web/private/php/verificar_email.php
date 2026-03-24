<?php
require "conexao.php";

$token = $_GET['token'] ?? '';

if (!$token) {
    die("Token inválido.");
}

$sql = "SELECT id FROM usuarios WHERE token_verificacao = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$token]);

$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

if ($usuario) {

    $sql = "UPDATE usuarios 
            SET email_verificado = TRUE, token_verificacao = NULL 
            WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$usuario['id']]);

    // 🔁 redireciona para login ou index
    header("Location: ../../public/index.html?email=confirmado");
    exit;

} else {
    header("Location: ../../public/index.html?email=erro");
    exit;
}