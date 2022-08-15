<?php
include_once "cors.php";
$user = $_GET["user"];
include_once "funciones.php";
$proyectos = obtenerProyectosPatrocinados($user);
echo json_encode($proyectos);