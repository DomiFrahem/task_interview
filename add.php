<?php 
    require_once "config.php";
    require "./DB.php";
     
    function add_hardware($id_type, $serial_number){        
        $db = new DB();
        $connect = $db->connect();
        
        $query = "INSERT INTO hardware (id_type, serial_number) VALUES (:id_type, :serial_number)";

        try {
            $stmt = $connect->prepare($query);
            $stmt->bindValue("id_type", $id_type, PDO::PARAM_INT);
            $stmt->bindValue("serial_number", $serial_number, PDO::PARAM_STR);
            $stmt->execute();
            return true; 
        } catch (PDOException $e){
            // print($e);
            return false;
        }
    }

    if (isset($_POST['type'])) $id_type = $_POST['type'];
    if (isset($_POST['serial_number'])) $serial_number = $_POST['serial_number'];
    
    $error_serial_number = array();
    $good_serial_number = array();

    foreach($serial_number as $number){
        if (add_hardware($id_type, $number)){
            array_push($good_serial_number, $number);
        } else {
            array_push($error_serial_number, $number);
        }
    }

    echo json_encode(array(
        "good" => $good_serial_number,
        "error" => $error_serial_number
    ));
        