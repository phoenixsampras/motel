<?php
  //Conexion para POSTGRESQL
  $host        = "host=74.50.117.68";
  $port        = "port=5432";
  $dbname      = "dbname=motel";
  $credentials = "user=odoo password=2r0ox1mGi7lax";

  $db = pg_connect( "$host $port $dbname $credentials"  );
  if(!$db){
    echo "Error : Unable to open database\n";
  } else {
//    echo "Opened database successfully\n";
  }
?>
