<?php

// Expected URL
// http://9.9.9.20/backend/motel_rest.php?task=checkout&product=1&quantity=2&price=3
//

header("Content-Type: text/javascript");
header('Access-Control-Allow-Origin: *');
error_reporting(1);

require_once ('rmDbConfig.sample.php');
require_once ('rmOdooConfig.sample.php');
require_once ('xmlrpc_lib/ripcord.php');
// require_once ('rmDbConfig.php');
// require_once ('rmOdooConfig.php');
// require_once ('xmlrpc_lib/ripcord.php');

// if (isset($_SERVER['HTTP_ORIGIN'])) {
//   header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
//   header('Access-Control-Allow-Credentials: true');
//   header('Access-Control-Max-Age: 86400'); // cache for 1 day
// }
//
// if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
//   if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
//   if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
//   exit(0);
// }

// date_default_timezone_set('America/La_Paz');
// print_r($_REQUEST);

switch ($_REQUEST["task"]) {

  case 'verPuertas':
    verPuertas($db);
  break;

  case 'verLogs':
    verLogs($db);
  break;

  case 'checkout':
    rmRegistrarPedidoMasivo($data);

  case 'login':
    login($data);

  default:
    // recibir($db);

}

function verPuertas($db) {
  try {
    $sql = "
      SELECT  rm_puerta1,
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
      id
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

function verLogs($db) {
  try {
    $sql = "
      SELECT rm_log
      FROM rm_arduino
      ORDER BY ID DESC LIMIT 1
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
        // print_r($resultado);
      }
    }

    echo $_GET['callback'].'({"verLogs": ' . json_encode($resultado) . '})';
    pg_close($db);

  } catch(PDOException $e) {
      echo $_GET['callback'].'({"error":{"text":'. pg_last_error($db) .'}})';
      exit;
  }
}

function rmRegistrarPedidoMasivo($conex, $user_id = '') {

  $default_cliente = 8;
  $default_usuario = 1;

	$url = $conex['url'];
	$db = $conex['db'];
	$username = $conex['username'];
	$password = $conex['password'];
	// $postdata = file_get_contents("php://input");
	// $jsondata = json_decode($postdata);

	// print_r($jsondata);
	// $rmUserId = intval($jsondata->rmUserId);
	// $orderIds = [];

	// $errors = [];
	// for ($i = 0; $i < count($jsondata->pedidos); $i++) {
	// $pedido = $jsondata->pedidos[$i];

	// $rmCustomer = VerificarCliente($conex, $pedido->customerObj);

	$rmDateOrder = date('Y-m-d H:i:s');
  $asDateStart = $_REQUEST["startDateFormated"];
  $asDateStartBD = $_REQUEST["startDateFormatedBD"];
  $asDateEnd = $_REQUEST["endDateFormatted"];
  $rmNote = 'Hora de Ingreso: ' . $_REQUEST["startDateFormated"] . "\n";
  $rmNote .= 'Hora de Salida: ' . $_REQUEST["endDateFormatted"] . "\n";
	$rmNote .= 'Habitacion Nro: ' . $_REQUEST["roomID"];
	// $latitude = $pedido->latitude;
	// $longitude = $pedido->longitude;
	// $numberOrder = $pedido->numberOrder;
	// $selectedProducts = $pedido->selectedProducts;
	$datosVenta = array(
		array(
			'user_id' => $default_usuario,
			'partner_id' => $default_cliente,
			'date_order' => $rmDateOrder,
      'as_hora_inicio' => $asDateStartBD,
      'as_hora_final' => $rmDateOrder,
			'note' => $rmNote,
			// 'origin' => $numberOrder,
      // 'user_id' => $rmUserId,
			// 'partner_id' => intval($rmCustomer),
			// 'date_order' => $rmDateOrder,
			// 'note' => $rmNote,
			// 'rm_latitude' => $latitude,
			// 'rm_longitude' => $longitude,
			// 'origin' => $numberOrder,
		)
	);

  // print_r($datosVenta);
	$uid = login($conex);
	$models = ripcord::client("$url/xmlrpc/2/object");

	$id = $models->execute_kw($db, $uid, $password, 'sale.order', 'create', $datosVenta);

	if (Is_Numeric($id)) {
		rmRegistrarLineaPedidoEmbeded($conex, $user_id, $_REQUEST['Products'], $id);
		$orderIds[] = $id;
	}
	else {
		$errors[] = $id;
	}
	// }

	if (!empty($orderIds)) {
		$resultado = json_encode($orderIds[0]);
    echo $_GET['callback'].'({"order_id": '. $resultado . ',"status":"success"})';
	}
	else {
		echo json_encode(["errors" => $errors, "status" => "error"]);
	}
}

function rmRegistrarLineaPedidoEmbeded($conex, $user_id, $products, $order_id)
{

  // print_r ($_REQUEST);

	$url = $conex['url'];
	$db = $conex['db'];
	$username = $conex['username'];
	$password = $conex['password'];
	$uid = login($conex);
	$models = ripcord::client("$url/xmlrpc/2/object");
	// foreach($products as $producto) {
  $rmProduct_id = $_REQUEST['product'];
  //$rmQuantity = round(abs(strtotime( $_REQUEST["startDateFormated"]) - strtotime($_REQUEST["endDateFormated"])) / 60,2);
	// $rmQuantity = $_REQUEST['quantity'];
	$order_id = $order_id;
	$name = 'snu snu 2 horitas';
	$price_unit = $_REQUEST['price'];
	$datos = array(
		array(
			'order_id' => $order_id,
			'product_id' => 2,
			'name' => 'Snu Snu 2 horitas',
			// 'price_unit' => $price_unit,
			//'product_uom_qty' => $rmQuantity,
			'product_uom' => 1,
			'route_id' => 3

			// BUG ODOO !! no encuentra la ruta por defecto

		)
	);
	$id = $models->execute_kw($db, $uid, $password, 'sale.order.line', 'create', $datos);
	if (Is_Numeric($id)) {
    return $id;
		// echo $_GET['callback'].'({"orderline_id": '. $id . ',"status":"success"})';

	}
	else {
		print_r($_REQUEST);
		print_r($datos);
		print_r($id);
	}
	// }
}

function login($conex)
{

  // print_r($conex);
	$url = $conex['url'];
	$db = $conex['db'];
	$username = $conex['username'];
	$password = $conex['password'];
	$common = ripcord::client("$url/xmlrpc/2/common");
  // print_r($common);
	// Autenticarse

	return $common->authenticate($db, $username, $password, array());
}

?>
