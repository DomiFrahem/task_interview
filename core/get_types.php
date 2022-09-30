<?php
   
    require_once "config.php";
    require "./DB.php";
    
   
    class TypesHardware {
        public $id, $name_type, $mask_ns;
    }

    
    function get_type_from_db(){        
        $db = new DB();
        $connect = $db->connect();
        
        $query = "SELECT * FROM types_hardware";
        $stmt = $connect->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_CLASS, "TypesHardware");
    }

    echo json_encode(get_type_from_db());