<?php

	function Connection(){
		$server = "q1mysql.dive-booking.com";
		$user = "thcmmuw";
		$pass = "baramithem";
		$db="q1project";
		

		$connection = mysql_connect($server, $user, $pass);

		if (!$connection) {
	    	die('MySQL ERROR: ' . mysql_error());
		}

		mysql_select_db($db) or die( 'MySQL ERROR: '. mysql_error() );

		return $connection;
	}
?>
