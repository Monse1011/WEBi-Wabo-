<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL); 

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
    $confirmPassword = trim($input['confirmPassword'] ?? '');
    $nombre = trim($input['nombre'] ?? '');
    $genero = trim($input['genero'] ?? '');
    $fechaNacimiento = trim($input['fechaNacimiento'] ?? '');



   
    if (empty($email) || empty($password) || empty($confirmPassword) || empty($nombre) || empty($genero) || empty($fechaNacimiento) ) {
        die(json_encode(["success" => false, "message" => "Todos los campos son obligatorios."]));
    }

    

    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !str_ends_with($email, '@alumnos.uady.mx')) {
        die(json_encode(["success" => false, "message" => "El correo debe ser válido y del dominio @alumnos.uady.mx."]));
    }

    $checkStmt = $conn->prepare("SELECT COUNT(*) FROM usuario WHERE email = ?");
    if (!$checkStmt) {
        die(json_encode(["success" => false, "message" => "Error al preparar la consulta: " . $conn->error]));
    }

    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $checkStmt->bind_result($count);
    $checkStmt->fetch();
    $checkStmt->close();

    if ($count > 0) {
        echo json_encode(["success" => false, "message" => "El correo ya está registrado."]);
        $conn->close();
        exit;
    }

 
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);


    $stmt = $conn->prepare("INSERT INTO usuario (email, password, nombre, fecha_nacimiento, genero) VALUES (?, ? , ? , ? , ?)");
    if (!$stmt) {
        die(json_encode(["success" => false, "message" => "Error al preparar la consulta: " . $conn->error]));
    }

    $stmt->bind_param("sssss", $email, $hashedPassword, $nombre, $fechaNacimiento, $genero);



    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Registro exitoso"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al registrar usuario: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Método de solicitud no válido."]);
}
?>
