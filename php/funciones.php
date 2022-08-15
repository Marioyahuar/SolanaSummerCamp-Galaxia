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
    $sentencia = $bd->query("SELECT ID, Category, ProjectName, SolGoal, DateLimit FROM projects1");
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
    $sentencia = $bd->query("SELECT * FROM projects1 ORDER by DateLimit ASC LIMIT $limite");
    //$sentencia-> execute([$limite]);
    return $sentencia->fetchAll();
}

function obtenerProyectosPatrocinados($user)
{
    $bd = obtenerConexion();
    $sentencia = $bd->query("SELECT ProjectId FROM donations WHERE User= $user");
    //$sentencia->execute([$user]);
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