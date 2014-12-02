<?php

include_once 'fns/get_revisions.php';
$revisions = get_revisions();

header('Content-Type: text/html; charset=UTF-8');

echo '<!DOCTYPE html>'
    .'<html>'
        .'<head>'
            .'<title>Speedometer</title>'
            .'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'
            .'<meta name="viewport" content="width=device-width, user-scalable=no" />'
            .'<link rel="icon" type="image/png"'
            .' href="images/icons/16.png?'.$revisions['images/icons/16.png'].'" />'
            .'<link rel="icon" type="image/png" sizes="32x32"'
            .' href="images/icons/32.png?'.$revisions['images/icons/32.png'].'" />'
            .'<link rel="icon" type="image/png" sizes="64x64"'
            .' href="images/icons/64.png?'.$revisions['images/icons/64.png'].'" />'
            .'<link rel="stylesheet" type="text/css" href="index.css?5" />'
        .'</head>'
        .'<body>'
            .'<img id="logoImage" src="images/icons/128.png?'.$revisions['images/icons/128.png'].'" />'
            .'<h1>Speedometer</h1>'
            .'<div>A GPS tracker app.</div>'
            .'<a class="button" href="run/">Launch</a>'
            .'<button class="button" id="installButton">Install</button>'
            .'<h2>Description</h2>'
            .'<div id="description">'
                .'Speedometer uses GPS to show the speed.'
                .' It also shows how long and how far you went,'
                .' what were your maximum and average speeds.'
                .' These features make it suitable for walking,'
                .' running, riding a bike or a car.'
                .' Speedometer supports both imperial and metric unit systems.'
            .'</div>'
            .'<script type="text/javascript" src="index.js"></script>'
        .'</body>'
    .'</html>';
