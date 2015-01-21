<?php

header('Content-Type: text/css');

$files = glob('./*.less');
natsort($files);
foreach ($files as $file) { echo file_get_contents($file); }
