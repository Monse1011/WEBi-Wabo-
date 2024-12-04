<?php

$servidor = "localhost";
$usuario = "root";
$clave = "";
$baseDeDatos = "uady";


$conn = new mysqli($servidor, $usuario, $clave, $baseDeDatos);


if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Conexión fallida: " . $conn->connect_error]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));
$email = $data->email;
$genero = $data->genero;


if (empty($email) || empty($genero)) {
    echo json_encode(["success" => false, "message" => "Email o género no proporcionados"]);
    exit;
}

$stmt = $conn->prepare("UPDATE usuario SET genero = ? WHERE email = ?");
$stmt->bind_param("ss", $genero, $email); 


if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "No se pudo actualizar el género"]);
}


$stmt->close();
$conn->close();

?>
