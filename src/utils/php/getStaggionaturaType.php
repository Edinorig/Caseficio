<?php
require_once('./connectionMySQL.php');

$response = array();

$json = file_get_contents('php://input');
$logData = json_decode($json);


$stmt = $conn->prepare('CALL getStaggionaturaType()');
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