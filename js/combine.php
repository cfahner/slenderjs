<?php

header('Content-Type: application/javascript');

$files = glob('./*.js');
natsort($files);
foreach ($files as $file) {
	if (mb_ereg_match('^.*\.min\.js$', "$file")) { continue; }
	echo file_get_contents($file);
}
