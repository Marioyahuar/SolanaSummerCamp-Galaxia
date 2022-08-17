<?php
include_once "cors.php";
$pId = $_GET["pId"];
$rId = $_GET["rId"];
include_once "funciones.php";
$proyectos = obtenerPatrocinadoresPorReward($pId,$rId);
echo json_encode($proyectos);