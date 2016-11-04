<?php

	include("connect.php");

	$link=Connection();

	$result=mysql_query("SELECT * FROM `tempLog` ORDER BY `timeStamp` DESC",$link);
	$lastpost=mysql_query("SELECT TOP 1 * FROM `tempLog`",$link);
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <title>Q1 tsarkisian : Data Chart</title>
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
    <!-- For Google Maps -->
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />

    <!-- Local lib URL here:
    <link href="bs/css/bootstrap.min.css" rel="stylesheet">
    <link href="bs/css/bootstrap-theme.min.css" rel="stylesheet">
    <script type="text/javascript" src="js/jquery-2.0.3.min.js"></script>
    <script type="text/javascript" src="bs/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="bootstrap.min.css">
    <link rel="stylesheet" href="bootstrap-theme.min.css">
    <script src="bootstrap.min.js"></script>
     -->
    <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <!-- START : Bootswatch Cyborg Theme -->
    <link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cyborg/bootstrap.min.css" rel="stylesheet" integrity="sha384-D9XILkoivXN+bcvB2kSOowkIvIcBbNdoDQvfBNsxYAIieZbx8/SI4NeUvrRGCpDi" crossorigin="anonymous">
    <!-- END : Bootswatch Cyborg Theme -->

    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"> -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>

    <style>
        .table_center {
            margin-top: 20px;
            margin-bottom: 20px;
            margin-left: 200px;
        }
    </style>
</head>

<body>
    <!-- START : NAV -->
    <header>
        <nav class="navbar navbar-inverse">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#the-menu">
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
                    <a class="navbar-brand brand" href="https://www.dive-booking.com/q1/index.html">Sensor I/O</a>
                </div>

                <div class="collapse navbar-collapse" id="the-menu">
                    <ul class="nav navbar-nav">
                        <li><a href="https://www.dive-booking.com/q1/index.html">Home</a></li>
                        <li><a href="https://www.dive-booking.com/q1/flow.html">Chart</a></li>
                        <li class="active"><a href="https://www.dive-booking.com/q1/data_table.php">Raw</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- END : NAV -->
    </header>

    <main>

        <div class="container">
          <div class="row">
            <div class="col-md-3 text-right foreCastText"></div>
          <!-- <div id="lastinsert" class="col-md-8 text-center"><?php $lastpost ?></div> -->
            <div class="col-md-5 text-right foreCastText">
          <table border="1" cellspacing="1" cellpadding="1">
       		<tr>
       			<td>&nbsp;Timestamp&nbsp;</td>
       			<td>&nbsp;Temperature 1&nbsp;</td>
       			<td>&nbsp;Humidity 1&nbsp;</td>
       			<td>&nbsp;Elevation 1&nbsp;</td>
       		</tr>

             <?php
       		  if($result!==FALSE){
       		     while($row = mysql_fetch_array($result)) {
       		        printf("<tr><td> &nbsp;%s </td><td> &nbsp;%s&nbsp; </td><td> &nbsp;%s&nbsp; </td><td> &nbsp;%s&nbsp; </td></tr>",
       		           $row["timeStamp"], $row["temperature"], $row["humidity"], $row["elevation"]);
       		     }
       		     mysql_free_result($result);
       		     mysql_close();
       		  }
             ?>

          </table>
          </div>
          <div class="col-md-4 text-right foreCastText"></div>
            </div>
            </div>
    </main>
    <footer>
        <div id="footer">
            <div class="container">
                <div class="text-muted pull-left"><a href="#" target="_blank">Built with Bootstrap&reg;</a></div>
                <div class="text-muted pull-right">&copy; <a href="#" target="_blank">TPS</a> 2016</div>
            </div>
        </div>
        <!-- END: Footer -->
    </footer>


    <!-- START: Modals -->


    <!-- END: Modals -->

</body>

</html>
