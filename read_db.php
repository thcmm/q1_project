<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$server = "q1mysql.dive-booking.com";
$user = "thcmmuw";
$pass = "baramithem";
$db="q1project";

$conn = new mysqli($server, $user, $pass, $db);
$result = $conn->query("SELECT * FROM `tempLog` ORDER BY `timeStamp` DESC LIMIT 1");

$outp = "";
$rs = $result->fetch_array(MYSQLI_ASSOC);
// var_dump($rs);
$outp .= '{"Temperature":"'  . $rs["temperature"] . '",';
$outp .= '"Humidity":"'   . $rs["humidity"]        . '",';
$outp .= '"Elevation":"'. $rs["elevation"]     . '"}';

$conn->close();
echo($outp);
?>
