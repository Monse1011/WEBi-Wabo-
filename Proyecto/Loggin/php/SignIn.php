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

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);

    if (!is_array($input)) {
        die(json_encode(["success" => false, "message" => "Datos JSON inválidos."]));
    }

    $email = trim($input['email'] ?? '');
    $password = trim($input['password'] ?? '');
    
    if (empty($email) || empty($password)) {
        die(json_encode(["success" => false, "message" => "Todos los campos son obligatorios."]));
    }


    $stmt = $conn->prepare("SELECT password FROM usuario WHERE email = ?");
    if (!$stmt) {
        die(json_encode(["success" => false, "message" => "Error al preparar la consulta: " . $conn->error]));
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();


    if ($stmt->num_rows === 0) {
        die(json_encode(["success" => false, "message" => "El correo electrónico no está registrado."]));
    }


    $stmt->bind_result($hashedPassword);
    $stmt->fetch();


    if (!password_verify($password, $hashedPassword)) {
        die(json_encode(["success" => false, "message" => "Contraseña incorrecta."]));
    }

    $_SESSION['user_id'] = $userId;
    
    echo json_encode(["success" => true, "message" => "Inicio de sesión exitoso", "user_id" => $userId]);

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Método de solicitud no válido."]);
}
?>
