<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');
    $confirmPassword = trim($_POST['confirmPassword'] ?? '');

   
    $errors = [];


    if (empty($email)) {
        $errors[] = "El correo es obligatorio.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "El correo no es válido.";
    } elseif (!preg_match('/@alumnos\.uady\.mx$/', $email)) {
        $errors[] = "El correo debe ser institucional (@alumnos.uady.mx).";
    }

   
    if (empty($password)) {
        $errors[] = "La contraseña es obligatoria.";
    } elseif (strlen($password) < 8) {
        $errors[] = "La contraseña debe tener al menos 8 caracteres.";
    }

    if (empty($confirmPassword)) {
        $errors[] = "La confirmación de la contraseña es obligatoria.";
    } elseif ($password !== $confirmPassword) {
        $errors[] = "Las contraseñas no coinciden.";
    }


    if (!empty($errors)) {
        foreach ($errors as $error) {
            echo "<p style='color: red;'>$error</p>";
        }
    } else {
        
        echo "<p style='color: green;'>¡Registro exitoso!</p>";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UadyPoint</title>
    <link rel="stylesheet" href="../Css/Correo.css">
    <link rel="stylesheet" href="../Css/Loggin.css">
</head>
<body>

    <div class="regresar">
        <a href="../../PaginaInicio/HTML/homePage.html">Regresar</a>
    </div>

    <div class="contenedor">
        <div class="formularioContenedor">

            <div class="logo">
                <img src="../Recursos/jaguar.png" alt="Logo">
            </div>

            <div class="instruccion">
                <h2>¡Es hora de crear una nueva cuenta!</h2>
            </div>

            <div class="formulario">
                <form method="post">
                    <div class="correo">
                        <label>Ingresa tu correo institucional</label>
                        <input type="email" name="email">
                    </div>
                    <div class="contraseña">
                        <label>Ahora ingresa una contraseña</label>
                        <input type="password" name="password">
                    </div>
                    <div class="contraseña">
                        <label>Confirma tu contraseña</label>
                        <input type="password" name="confirmPassword">
                    </div>
                    <div class="boton">
                        <button type="submit">Continuar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="../../Loggin/JS/Correo.js" ></script>
 
</body>
</html>
