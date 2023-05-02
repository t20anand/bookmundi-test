<?php

class Database{
    private $host;
    private $port;
    private $username;
    private $password;
    private $database;
    private static $instance;

    public $conn;

    private function __construct() {
    
    }

    public static function getInstance() {
        if(null == self::$instance){
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function connect(string $host, string $username, string $password, string $database = "", int $port = 3306) {
        $this->host = $host;   
        $this->port = $port;   
        $this->username = $username;   
        $this->password = $password;   
        $this->database = $database;   

        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->database, $this->port);

        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
        
        return $this->conn;
    }
}