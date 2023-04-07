<?php
require_once('./connectionMySQL.php');

$response = array();

$json = file_get_contents('php://input');
$cheeseData = json_decode($json);

$staggionatura = $cheeseData->staggionatura;
$scelta = $cheeseData->scelta;
$uidCaseficio = $cheeseData->uidCaseficio;
$codiceUnivoco = $cheeseData->codiceUnivoco;
$idAcquirente = $cheeseData->idAcquirente;
$codiceCaseficio = $cheeseData->codiceCaseficio;

$stmt = $conn->prepare('CALL insertCheese(?,?,?,?,?,?)');
$stmt->bind_param('iiisis', $scelta, $staggionatura,$codiceCaseficio, $codiceUnivoco,$idAcquirente, $uidCaseficio);

if ($stmt->execute()) {
    $response = array(
        'data' => null,
        'status' => 200,
    );
} else {
    $response = array(
        'data' => $conn->error,
        'status' => 404,
    );
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>