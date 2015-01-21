<!DOCTYPE html>
<html>
	<head>
		<meta charset=utf-8>
		<meta http-equiv=content-type content="text/html; charset=utf-8">
		<meta name=viewport content="width=device-width, initial-scale=1">
		<title>Slender.JS</title>
		<link rel="stylesheet/less" type="text/css" href="css/combine.php">
		<script type="application/javascript" src="js/less.min.js"></script>
		<script type="application/javascript" src="js/jquery.min.js"></script>
		<script type="application/javascript" src="js/combine.php"></script>
	</head>
	<body>
		<?php
			echo file_get_contents('htincludes/nav.html');
			$PNAME = isset($_REQUEST['p']) ? mb_ereg_replace('[.]', '', ''.$_REQUEST['p']) : 'index';
			echo file_get_contents('htincludes/p_' . $PNAME . '.html');
		?>
	</body>
</html>
