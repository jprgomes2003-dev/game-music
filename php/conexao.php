<?php
require __DIR__ . '/../vendor/autoload.php'; // acessa autoload na raiz

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..'); // aponta para a raiz
$dotenv->load();

$host = $_ENV['DB_HOST'];
$db   = $_ENV['DB_NAME'];
$user = $_ENV['DB_USER'];
$pass = $_ENV['DB_PASS'];

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


} catch (PDOException $e) {
    echo "❌ Erro na conexão: " . $e->getMessage();
}

?>