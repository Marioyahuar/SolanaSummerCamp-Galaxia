<?php

include('connectar.php');

try 
{
    $dbh = new PDO('mysql:host='. $hostname .';dbname='. $database, $username, $password);
    $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $dbh->beginTransaction();

    $_ID = $_POST['ID'];
    
    $sth = $dbh->prepare('SELECT `ProjectName` FROM `projects1` WHERE `ID` = :ID');
    $sth->bindParam(':ID', $_ID, PDO::PARAM_STR);
    $sth->execute();

    $sth->setFetchMode(PDO::FETCH_ASSOC); 
    $result = $sth->fetchAll();
    
    if (count($result) > 0 ) 
    {
        echo $result[0]['ProjectName'];
    }
    else
    {
        echo 'no se encontro el';
    }
    $dbh->commit();
}
catch(PDOException $e)
{
	echo "Error: " . $e->getMessage();
}
   
?>
