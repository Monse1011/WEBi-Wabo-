<?php
session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

$servidor = "localhost";
$usuario = "root";
$clave = "";
$baseDeDatos = "uady";

$conn = new mysqli($servidor, $usuario, $clave, $baseDeDatos);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Conexión fallida: " . $conn->connect_error]));
}

if (!isset($_SESSION['user_id'])) {
    die(json_encode(["success" => false, "message" => "Usuario no autenticado."]));
}

$userId = $_SESSION['user_id'];

$stmt = $conn->prepare("SELECT nombre, email FROM usuario WHERE id = ?");

if (!$stmt) {
    die(json_encode(["success" => false, "message" => "Error al preparar la consulta: " . $conn->error]));
}

$stmt->bind_param("i", $userId);
$stmt->execute();
$resultado = $stmt->get_result();

if ($usuario = $resultado->fetch_assoc()) {
    echo json_encode([
        "success" => true,
        "usuario" => $usuario
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Usuario no encontrado."]);
}

$stmt->close();
$conn->close();

?>