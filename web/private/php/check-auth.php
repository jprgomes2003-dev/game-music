<?php
session_start();
header('Content-Type: application/json');

$response = [
    "logado" => false,
    "precisa_username" => false
];

if (isset($_SESSION['usuario_id']) && !empty($_SESSION['usuario_id'])) {
    $response["logado"] = true;
    $response["nome"] = $_SESSION['nome'];
}


if (isset($_SESSION['google_temp'])) {
    $response["precisa_username"] = true;
}

echo json_encode($response);