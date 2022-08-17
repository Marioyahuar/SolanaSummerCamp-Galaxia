<?php
include_once "cors.php";
include_once "funciones.php";
$proyectos = obtenerProyectos();
echo json_encode($proyectos);