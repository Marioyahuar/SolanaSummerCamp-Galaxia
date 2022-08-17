<?php
include_once "cors.php";
$id = $_GET["id"];
include_once "funciones.php";
$proyectos = obtenerPatrocinadores($id);
echo json_encode($proyectos);