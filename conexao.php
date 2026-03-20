<?php

$host = "localhost";
$db = "quiz_musical";
$user = "postgres";
$pass = "suasenha";

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


} catch (PDOException $e) {
    echo "❌ Erro na conexão: " . $e->getMessage();
}

?>