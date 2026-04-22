<?php
require __DIR__ . "/conexao.php";

header('Content-Type: application/json');

function resposta($status, $message) {
    echo json_encode([
        "status" => $status,
        "message" => $message
    ]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $senha = $_POST['senha'] ?? '';
    $confirmar_senha = $_POST['confirmar_senha'] ?? '';
    $data_nascimento = $_POST['data_nascimento'] ?? '';

    if (empty($nome) || empty($email) || empty($senha) || empty($confirmar_senha) || empty($data_nascimento)) {
        resposta("error", "Preencha todos os campos!");
    }

    if ($senha !== $confirmar_senha) {
        resposta("error", "Senhas não coincidem!");
    }

    $dataAtual = new DateTime();
    $dataNasc = new DateTime($data_nascimento);

    if ($dataNasc > $dataAtual) {
        resposta("error", "Data de nascimento inválida!");
    }

    try {

       
        $sql = "SELECT id FROM usuarios WHERE email = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email]);

        if ($stmt->rowCount() > 0) {
            resposta("error", "Email já cadastrado!");
        }

       
        $sql = "SELECT id FROM usuarios WHERE nome = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$nome]);

        if ($stmt->rowCount() > 0) {
            resposta("error", "Nome de usuário já existe!");
        }

        
        $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

        $sql = "INSERT INTO usuarios (nome, email, senha_hash, data_nascimento)
                VALUES (?, ?, ?, ?)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([$nome, $email, $senha_hash, $data_nascimento]);

        resposta("success", "Cadastro realizado com sucesso!");

    } catch (PDOException $e) {
        resposta("error", "Erro ao cadastrar!");
    }
}