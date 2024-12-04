<?php

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
    $name = trim($input['name'] ?? '');


    if (empty($email) || empty($name)) {
        die(json_encode(["success" => false, "message" => "Todos los campos son obligatorios."]));
    }

 
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !str_ends_with($email, '@alumnos.uady.mx')) {
        die(json_encode(["success" => false, "message" => "El correo debe ser válido y del dominio @alumnos.uady.mx."]));
    }

    $stmt = $conn->prepare("SELECT * FROM usuario WHERE email = ?");
    if (!$stmt) {
        die(json_encode(["success" => false, "message" => "Error al preparar la consulta: " . $conn->error]));
    }
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    
    if ($result->num_rows > 0) {
       
        $stmt = $conn->prepare("UPDATE usuario SET nombre = ? WHERE email = ?");
        if (!$stmt) {
            die(json_encode(["success" => false, "message" => "Error al preparar la consulta de actualización: " . $conn->error]));
        }
        $stmt->bind_param("ss", $name, $email);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Nombre registrado exitosamente."]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al actualizar el nombre: " . $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "El correo no está registrado."]);
    }

    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Método de solicitud no válido."]);
}
?>
