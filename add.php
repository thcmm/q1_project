<?php
   	include("connect.php");

   	$link=Connection();

	$temp1=$_POST["temp1"];
	$hum1=$_POST["hum1"];
  $elev1=$_POST["elev1"];

	$query = "INSERT INTO tempLog (temperature, humidity, elevation) VALUES ('".$temp1."','".$hum1."','".$elev1."')";

  mysql_query($query,$link);
	mysql_close($link);

   header("Location: index.php");
  //  exit($query);
?>
