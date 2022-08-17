<?php
include_once "cors.php";
$limite = $_GET["limite"];
include_once "funciones.php";
$proyectos = obtenerUltimosProyectos($limite);
echo json_encode($proyectos);