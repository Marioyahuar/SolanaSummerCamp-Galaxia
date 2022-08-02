<?php
    $error = "";
    
    try {
        
        include 'connectar.php';
        
        $dbh->beginTransaction();
        
        $wallet = $_POST["wallet"];
        //echo $wallet;
        $sth = $dbh->prepare("SELECT wallet FROM solana WHERE wallet = $wallet");
        //$sth->bindParam(1, $wallet);
        $sth->execute();
        $sth->setFetchMode(PDO::FETCH_ASSOC);
        $result = $sth->fetchAll();
        echo json_encode($result);
        if (count($result) > 0) 
        {
            //echo 'USUARIO EXISTENTE';
            $sth = $dbh->prepare("UPDATE solana SET payed = 1 WHERE wallet = $wallet");
            $sth->execute();
            //echo "updated";
        }
        else
        {
            //echo 'USUARIO INEXISTENTE';
            $sth = $dbh->prepare("INSERT INTO solana (wallet) VALUES ($wallet)");
	        //$sth->bindParam(1, $wallet, PDO::PARAM_STR, 8);
            $sth->execute();
                        
            $new = $dbh->lastInsertId();
            
		    //echo "inserted";
        }

        $dbh->commit();
    }
    catch(PDOException $e)
    {
        //$error = 'ERROR AL INGRESAR DATA';
    }
    
    if ($error != "")
    {
        //echo $error;
        $dbh->rollBack();
    }
?>