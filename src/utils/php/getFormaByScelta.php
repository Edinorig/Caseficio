<?php
require_once('./connectionMySQL.php');

$response = array();

$json = file_get_contents('php://input');
$data = json_decode($json);

$identificatorCaseficio = $data->identificatorCaseficio;
$sceltaId = $data->sceltaId;

$stmt = $conn->prepare('CALL getFormaByScelta(?,?)');
$stmt->bind_param('si', $identificatorCaseficio,$sceltaId);
$stmt->execute();

$result = $stmt->get_result();

if ($result != null) {
    $records = array();
    while ($row = $result->fetch_assoc()) {
        $records[] = $row;
    }
    $response = array(
        'data' => $records,
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