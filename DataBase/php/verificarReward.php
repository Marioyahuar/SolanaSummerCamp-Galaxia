<?php
include_once "cors.php";
$pId = $_GET["pId"];
$rId = $_GET["rId"];
$user = $_GET["user"];
include_once "funciones.php";
$proyectos = verificarReward($pId,$rId,$user);
echo json_encode($proyectos);