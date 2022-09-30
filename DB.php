<?php

class DB
{

    function connect()
    {
        global $DB_NAME;
        global $DB_USER;
        global $DB_PASSWORD;
        global $DB_HOST;

        $dns = "mysql:host={$DB_HOST};dbname={$DB_NAME}";
        return new PDO($dns, $DB_USER, $DB_PASSWORD);
    }

    function connect_with_param($host, $user, $passwd, $dbname)
    {
        $dns = "mysql:host={$host};dbname={$dbname}";
        return new PDO($dns, $user, $passwd);
    }
}
