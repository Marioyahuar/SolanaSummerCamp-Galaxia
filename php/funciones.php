<?php

function obtenerProyectoPorId($id)
{
    $bd = obtenerConexion();
    $sentencia = $bd->prepare("SELECT ID, ProjectName, SolGoal, DateLimit FROM projects1 WHERE id = ?");
    $sentencia->execute([$id]);
    return $sentencia->fetchObject();
}

function obtenerProyectos()
{
    $bd = obtenerConexion();
    $sentencia = $bd->query("SELECT ID, ProjectName, SolGoal, DateLimit FROM projects1");
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