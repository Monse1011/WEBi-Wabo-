<?php

    $filepdf = '../Recursos/Términos y Condiciones.pdf'; 
    if (file_exists($filepdf)) {
 
        header('Content-Description: File Transfer');
        header('Content-Type: application/pdf'); 
        header('Content-Disposition: attachment; filename='.basename($filepdf)); 
        header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($filepdf));
    
        ob_clean(); 
        flush();  
    
        readfile($filepdf); 
        exit; 
    } else {
        echo "El archivo no se encuentra disponible.";
    }
    
?>