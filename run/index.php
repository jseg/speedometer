<?php

include_once 'fns/get_run_revisions.php';
$revisions = get_run_revisions();

include_once 'fns/echo_html.php';
echo_html(
    '<html manifest="cache-manifest/">',
    '<link rel="stylesheet" type="text/css" href="compressed.css?'.$revisions['compressed.css'].'" />',
    '<script type="text/javascript" src="compressed.js?'.$revisions['compressed.js'].'"></script>'
);
