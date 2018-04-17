<?php
header("Content-Type: text/javascript");
header('Access-Control-Allow-Origin: *');
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
      SELECT  rm_puerta1, rm_puerta2, rm_puerta3, rm_puerta4, rm_puerta5, rm_puerta6, rm_puerta7, rm_puerta8, rm_puerta9, rm_puerta10, rm_puerta11, rm_puerta12, rm_puerta13, rm_puerta14, rm_puerta15, rm_puerta16, rm_puerta17, rm_puerta18, rm_puerta19, rm_puerta20, rm_puerta21, rm_puerta22, rm_puerta23, rm_puerta24, rm_puerta25, rm_puerta26
      FROM rm_arduino
      ORDER BY ID DESC LIMIT 1
    ";

    $puertas = array();

    if(!$db){
      echo "Error : Unable to open database";
    } else {
      $query = pg_query($db, $sql);
      if(!$query){
        echo "Error".pg_last_error($db);
        exit;
      } else {
        $resultado = pg_fetch_all($query);
        // print_r($resultado);
        $y = 1;
        foreach ($resultado[0] as $array1) {
            // print_r($array1);
            $puertas[$y] = $array1;
            $y++;
        }
        // print_r($puertas);
      }
    }

    echo $_GET['callback'].'({"verPuertas": ' . json_encode($puertas) . '})';
    pg_close($db);

  } catch(PDOException $e) {
      echo $_GET['callback'].'({"error":{"text":'. pg_last_error($db) .'}})';
      exit;
  }
}

?>
