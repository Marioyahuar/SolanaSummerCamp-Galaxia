<?php
include_once "cors.php";
$donation = json_decode(file_get_contents("php://input"));
include_once "funciones.php";
$resultado = crearNuevoPatrocinio($donation);
echo json_encode($resultado);