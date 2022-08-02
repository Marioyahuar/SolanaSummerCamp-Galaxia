<?php

    $dominiopermitido = "http://localhost:3000";
    header("Access-Control-Allow-Origin: $dominiopermitido");
    //header("Access-Control-Allow-Headers: content-type");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: OPTIONS, GET, PUT , POST , DELETE");

    $hostname = 'localhost';
    $username = 'root';
    $password = '';
    $database = 'test';
    
    $dbh = new PDO('mysql:host='. $hostname .';dbname='. $database, $username, $password);
    //$dbh = mysqli_connect($hostname,$username, $password,$database) or die("unable to connect");
?>
