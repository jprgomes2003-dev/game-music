<?php
require __DIR__ . "/conexao.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = $_POST['email'] ?? '';
    $senha = $_POST['senha'] ?? '';

    if (empty($email) || empty($senha)) {
        header("Location: ../../public/index.html?login=erro");
        exit;
    }

    try {

        // buscar usuário
        $sql = "SELECT * FROM usuarios WHERE email = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email]);

        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        // usuário não existe
        if (!$usuario) {
            header("Location: ../../public/index.html?login=erro");
            exit;
        }

        // verificar senha
        if (!password_verify($senha, $usuario['senha_hash'])) {
            header("Location: ../../public/index.html?login=erro");
            exit;
        }

        // sessão
        session_regenerate_id(true);

        $_SESSION['usuario_id'] = $usuario['id'];
        $_SESSION['nome'] = $usuario['nome'];

        // login OK
        header("Location: ../../public/index.html?login=ok");
        exit;

    } catch (PDOException $e) {
        header("Location: ../../public/index.html?login=erro");
        exit;
    }
}