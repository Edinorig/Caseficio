<?php
require_once('./connectionMySQL.php');

$response = array();

$json = file_get_contents('php://input');
$milkData = json_decode($json);

$latteRaccolto = $milkData->latteRaccolto;
$latteUsato = $milkData->latteUsato;
$dataRaccolta = $milkData->dataRaccolta;
$uidCaseficio = $milkData->uidCaseficio;

$stmt = $conn->prepare('CALL insertMilk(?,?,?,?)');
$stmt->bind_param('iiss', $latteRaccolto, $latteUsato, $dataRaccolta, $uidCaseficio);

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