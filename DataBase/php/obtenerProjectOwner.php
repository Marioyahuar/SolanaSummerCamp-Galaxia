<?php
include_once "cors.php";
$id = $_GET["id"];
include_once "funciones.php";
$proyecto = obtenerProjectOwnerPorId($id);
echo json_encode($proyecto);