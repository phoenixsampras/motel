<?php
header("Content-Type: text/javascript");
error_reporting(0);
require_once('rmDbConfig.php');
// date_default_timezone_set('America/La_Paz');

// print_r($_REQUEST);
switch ($_REQUEST["task"]) {

  case 'verPuertas':
    verPuertas($db);
  break;

  default:
    // recibir($db);

}

function verPuertas($db) {
  try {
    $sql = "
    SELECT * FROM rm_arduino ORDER BY ID DESC LIMIT 1
    ";

    if(!$db){
      echo "Error : Unable to open database";
    } else {
      $query = pg_query($db, $sql);
      if(!$query){
        echo "Error".pg_last_error($db);
        exit;
      } else {
        $resultado = pg_fetch_all($query);
      }
    }

    echo $_GET['callback'].'({"verPuertas": ' . json_encode($resultado) . '})';
    pg_close($db);

  } catch(PDOException $e) {
      echo $_GET['callback'].'({"error":{"text":'. pg_last_error($db) .'}})';
      exit;
  }
}

?>
