<?php
session_start();

if (!isset($_SESSION['usuario_id'])) {
    header("Location: ../../public/index.html");
    exit;
}
?>

<h1>Bem-vindo, <?php echo $_SESSION['nome']; ?> 🎵</h1>

<a href="../../private/php/logout.php">Sair</a>