<?php
header("Content-Type: text/javascript");
error_reporting(E_ALL);
require_once('rmDbConfig.php');
// date_default_timezone_set('America/La_Paz');

// print_r($_REQUEST);
switch ($_REQUEST["task"]) {

  case 'verLecturas':
    verLecturas($db);
  break;

  default:
    recibir($db);

}

function verLecturas() {
  try {
    $sql = "
    SELECT 
      rm_timestamp,
      rm_puerto_a,
      rm_puerto_c,
      rm_puerto_f,
      rm_puerto_k,
      rm_puerta1,
      rm_puerta2,
      rm_puerta3,
      rm_puerta4,
      rm_puerta5,
      rm_puerta6,
      rm_puerta7,
      rm_puerta8,
      rm_puerta9,
      rm_puerta10,
      rm_puerta11,
      rm_puerta12,
      rm_puerta13,
      rm_puerta14,
      rm_puerta15,
      rm_puerta16,
      rm_puerta17,
      rm_puerta18,
      rm_puerta19,
      rm_puerta20,
      rm_puerta21,
      rm_puerta22,
      rm_puerta23,
      rm_puerta24,
      rm_puerta25,
      rm_puerta26,
      rm_log
    FROM
    rm_arduino 
    ORDER by id desc
    LIMIT 100;
    ";

    // file_put_contents($file, $sql, FILE_APPEND | LOCK_EX);
    // file_put_contents($file, $_REQUEST[], FILE_APPEND | LOCK_EX);
    //echo $sql;

    if(!$db){
      file_put_contents($file, "Error : Unable to open database \n" , FILE_APPEND | LOCK_EX);
    } else {
      $query = pg_query($db, $sql);
      if(!$query){
        file_put_contents($file, pg_last_error($db) , FILE_APPEND | LOCK_EX);
        // echo "Error".pg_last_error($db);
        exit;
      } else {
        $resultado = pg_fetch_all($query);
        echo $_GET['callback'].'({"verLogs": ' . json_encode($resultado) . '})';
      }
    }




    // echo $_GET['callback'].'({"rmDatosIncsertados": ' . json_encode($resultado) . '})';
    pg_close($db);

  } catch(PDOException $e) {
      echo $_GET['callback'].'({"error":{"text":'. pg_last_error($db) .'}})';
      exit;
  }  
}

function recibir($db) {
  echo "Recibido:";
  $rm_timestamp_unix =   $_REQUEST["tiempo_unix"];
  $rm_puerto_a =   $_REQUEST["puerto_a"];
  $rm_puerto_c =   $_REQUEST["puerto_c"];
  $rm_puerto_f =   $_REQUEST["puerto_f"];
  $rm_puerto_k =   $_REQUEST["puerto_k"];

  print_r($_REQUEST);
  $data =  $rm_timestamp_unix . ',' . $rm_puerto_a . ',' . $rm_puerto_c . ',' . $rm_puerto_f . ',' . $rm_puerto_k;
  // echo $data;

  $rm_puerto_a_bin = sprintf( "%08d", decbin($rm_puerto_a));
  $rm_puerto_c_bin = sprintf( "%08d", decbin($rm_puerto_c));
  $rm_puerto_f_bin = sprintf( "%08d", decbin($rm_puerto_f));
  $rm_puerto_k_bin = sprintf( "%08d", decbin($rm_puerto_k));

  $rm_puerto_a_puertas = str_split($rm_puerto_a_bin);
  $rm_puerto_c_puertas = str_split($rm_puerto_c_bin);
  $rm_puerto_f_puertas = str_split($rm_puerto_f_bin);
  $rm_puerto_k_puertas = str_split($rm_puerto_k_bin);

  $rm_puerto_a_puertas_log = array_reverse(str_split($rm_puerto_a_bin));
  $rm_puerto_c_puertas_log = array_reverse(str_split($rm_puerto_c_bin));
  $rm_puerto_f_puertas_log = array_reverse(str_split($rm_puerto_f_bin));
  $rm_puerto_k_puertas_log = array_reverse(str_split($rm_puerto_k_bin));

  $rm_timestamp = date('Y-m-d H:i:s.u',$rm_timestamp_unix);
  $rm_timestamp_log = date('d-m-Y H:i:s.u',$rm_timestamp_unix);

  $file =  './datos_recibidos.txt';
  $logs = $rm_timestamp_log . " - Datos Recibidos: " . $data . " - BITS Puerto a:" . json_encode($rm_puerto_a_puertas_log) . " Puerto c:" . json_encode($rm_puerto_c_puertas_log) . " Puerto f:" . json_encode($rm_puerto_f_puertas_log) . " Puerto k:" . json_encode($rm_puerto_k_puertas_log) . " \n";
  file_put_contents($file, $logs, FILE_APPEND | LOCK_EX);

  try {
    $sql = "
    INSERT INTO rm_arduino (
      rm_timestamp,
      rm_puerto_a,
      rm_puerto_c,
      rm_puerto_f,
      rm_puerto_k,
      rm_puerta1,
      rm_puerta2,
      rm_puerta3,
      rm_puerta4,
      rm_puerta5,
      rm_puerta6,
      rm_puerta7,
      rm_puerta8,
      rm_puerta9,
      rm_puerta10,
      rm_puerta11,
      rm_puerta12,
      rm_puerta13,
      rm_puerta14,
      rm_puerta15,
      rm_puerta16,
      rm_puerta17,
      rm_puerta18,
      rm_puerta19,
      rm_puerta20,
      rm_puerta21,
      rm_puerta22,
      rm_puerta23,
      rm_puerta24,
      rm_puerta25,
      rm_puerta26,
      rm_log
    ) VALUES
    (
      '$rm_timestamp',
      $rm_puerto_a,
      $rm_puerto_c,
      $rm_puerto_f,
      $rm_puerto_k,
      '$rm_puerto_a_puertas[7]',
      '$rm_puerto_a_puertas[6]',
      '$rm_puerto_a_puertas[5]',
      '$rm_puerto_a_puertas[4]',
      '$rm_puerto_a_puertas[3]',
      '$rm_puerto_a_puertas[2]',
      '$rm_puerto_a_puertas[1]',
      '$rm_puerto_a_puertas[0]',
      '$rm_puerto_c_puertas[7]',
      '$rm_puerto_c_puertas[6]',
      '$rm_puerto_c_puertas[5]',
      '$rm_puerto_c_puertas[4]',
      '$rm_puerto_c_puertas[3]',
      '$rm_puerto_c_puertas[2]',
      '$rm_puerto_c_puertas[1]',
      '$rm_puerto_c_puertas[0]',
      '$rm_puerto_f_puertas[7]',
      '$rm_puerto_f_puertas[6]',
      '$rm_puerto_f_puertas[5]',
      '$rm_puerto_f_puertas[4]',
      '$rm_puerto_f_puertas[3]',
      '$rm_puerto_f_puertas[2]',
      '$rm_puerto_f_puertas[1]',
      '$rm_puerto_f_puertas[0]',
      '$rm_puerto_k_puertas[7]',
      '$rm_puerto_k_puertas[6]',
      '$logs'
    ) RETURNING id;
    ";

    // file_put_contents($file, $sql, FILE_APPEND | LOCK_EX);
    // file_put_contents($file, $_REQUEST[], FILE_APPEND | LOCK_EX);
    //echo $sql;

    if(!$db){
      file_put_contents($file, "Error : Unable to open database \n" , FILE_APPEND | LOCK_EX);
    } else {
      $query = pg_query($db, $sql);
      if(!$query){
        file_put_contents($file, pg_last_error($db) , FILE_APPEND | LOCK_EX);
        // echo "Error".pg_last_error($db);
        exit;
      } else {
        $resultado = pg_fetch_all($query);
        file_put_contents($file, "Grabado en DB id: " . $resultado[0]['id'] . " \n", FILE_APPEND | LOCK_EX);
      }
    }




    // echo $_GET['callback'].'({"rmDatosIncsertados": ' . json_encode($resultado) . '})';
    pg_close($db);

  } catch(PDOException $e) {
      echo $_GET['callback'].'({"error":{"text":'. pg_last_error($db) .'}})';
      exit;
  }

}
?>
