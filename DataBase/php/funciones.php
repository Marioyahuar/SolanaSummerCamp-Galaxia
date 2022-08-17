<?php

function obtenerProyectoPorId($id)
{
    $bd = obtenerConexion();
    $sentencia = $bd->prepare("SELECT * FROM projects1 WHERE ID = ?");
    $sentencia->execute([$id]);
    return $sentencia->fetchObject();
}

function obtenerProjectOwnerPorId($id)
{
    $bd = obtenerConexion();
    $sentencia = $bd->prepare("SELECT ProjectOwner FROM projects1 WHERE ID = ?");
    $sentencia->execute([$id]);
    return $sentencia->fetchObject();
}

function obtenerProyectos() //Arg = ID's a recuperar
{   //La función debe devolver solo los proyectos que coincidan con los ID's 
    $bd = obtenerConexion();
    $sentencia = $bd->query("SELECT ID, Category, ProjectName, Description, SolGoal, DateLimit FROM projects1 WHERE TIMEDIFF(CURRENT_TIMESTAMP(),DateLimit)<=0");
    return $sentencia->fetchAll();
}

function crearNuevoPatrocinio($donation){
    $bd = obtenerConexion();
    $sentencia = $bd->prepare("INSERT INTO donations(User, TxHash, ProjectId, RewardId) VALUES (?, ?, ?, ?)");
    return $sentencia->execute([$donation->User, $donation->TxHash, $donation->ProjectId, $donation->RewardId]);
}

function obtenerUltimosProyectos($limite)
{
    $bd = obtenerConexion();
    $sentencia = $bd->query("SELECT * FROM projects1 WHERE TIMEDIFF(CURRENT_TIMESTAMP(),DateLimit)<=0  ORDER by DateLimit ASC LIMIT $limite");
    //$sentencia-> execute([$limite]);
    return $sentencia->fetchAll();
}

function obtenerProyectosPatrocinados($user)
{
    $bd = obtenerConexion();
    $sentencia = $bd->query("SELECT * FROM projects1 inner join donations on projects1.ID= donations.ProjectId WHERE donations.User=$user");
    //$sentencia->execute([$user]);
    return $sentencia->fetchAll();
}

function obtenerPatrocinadores($id){
    $bd = obtenerConexion();
    $sentencia = $bd->query("SELECT User FROM donations WHERE ProjectId= $id");
    //$sentencia->execute([$user]);
    return $sentencia->fetchAll();
}

function verificarReward($pId,$rId,$user){
    $bd = obtenerConexion();
    $sentencia = $bd->query("SELECT `DonationID` FROM `donations` WHERE (`User`=$user && `ProjectId`=$pId && `RewardId`=$rId)");
    //$sentencia->execute([$user]);
    return $sentencia->fetchAll();
}

function obtenerPatrocinadoresPorReward($pId,$rId){
    $bd = obtenerConexion();
    $sentencia = $bd->query("SELECT * FROM donations WHERE ProjectId=$pId AND RewardId=$rId");
    return $sentencia->fetchAll();
}


function obtenerConexion()
{
    $password = '';
    $user = 'root';
    $dbName = 'test';
    $database = new PDO('mysql:host=localhost;dbname=' . $dbName, $user, $password);
    $database->query("set names utf8;");
    $database->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $database->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    return $database;
}