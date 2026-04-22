<?php
session_start();
header('Content-Type: application/json');
require __DIR__ . "/conexao.php";

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["status" => "error", "message" => "Não autenticado"]);
    exit;
}

$id = $_SESSION['usuario_id'];
$data = json_decode(file_get_contents("php://input"), true);

$nome = $data['nome'] ?? null;
$senhaAtual = $data['senha_atual'] ?? null;
$novaSenha = $data['nova_senha'] ?? null;
try {

    // 🔍 Buscar usuário atual
    $stmt = $pdo->prepare("SELECT senha_hash FROM usuarios WHERE id = ?");
    $stmt->execute([$id]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        echo json_encode(["status" => "error", "message" => "Usuário não encontrado"]);
        exit;
    }

    $temSenha = !empty($usuario['senha_hash']);

    // ================= TROCA DE SENHA =================
    if ($novaSenha) {

        // 🔐 USUÁRIO COM SENHA (login normal)
        if ($temSenha) {

            if (!$senhaAtual) {
                echo json_encode([
                    "status" => "error",
                    "message" => "Digite a senha atual"
                ]);
                exit;
            }

            if (!password_verify($senhaAtual, $usuario['senha_hash'])) {
                echo json_encode([
                    "status" => "error",
                    "message" => "Senha atual incorreta"
                ]);
                exit;
            }
        }

        // 🔥 VALIDAÇÃO NOVA SENHA
        if (strlen($novaSenha) < 5) {
            echo json_encode([
                "status" => "error",
                "message" => "Senha deve ter no mínimo 5 caracteres"
            ]);
            exit;
        }

        $hash = password_hash($novaSenha, PASSWORD_DEFAULT);

        $pdo->prepare("UPDATE usuarios SET senha_hash = ? WHERE id = ?")
            ->execute([$hash, $id]);
    }

    // ================= ATUALIZAR NOME =================
    if ($nome) {
        $pdo->prepare("UPDATE usuarios SET nome = ? WHERE id = ?")
            ->execute([$nome, $id]);

        $_SESSION['nome'] = $nome;
    }

    echo json_encode([
        "status" => "success",
        "message" => "Atualizado com sucesso"
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Erro interno"
    ]);
}