<?php

function echo_html ($html, $head, $body) {

    include_once __DIR__.'/../../fns/get_revisions.php';
    $revisions = get_revisions();

    header('Content-Type: text/html; charset=UTF-8');
    echo '<!DOCTYPE html>'
        .$html
            .'<head>'
                .'<title>Speedometer</title>'
                .'<meta http-equiv="Content-Type"'
                .' content="text/html; charset=UTF-8" />'
                .'<meta name="viewport" content="width=device-width, user-scalable=no" />'
                .'<link rel="icon" type="image/png"'
                .' href="../images/icons/16.png?'.$revisions['images/icons/16.png'].'" />'
                .'<link rel="icon" type="image/png" sizes="32x32"'
                .' href="../images/icons/32.png?'.$revisions['images/icons/32.png'].'" />'
                .'<link rel="icon" type="image/png" sizes="64x64"'
                .' href="../images/icons/64.png?'.$revisions['images/icons/64.png'].'" />'
                .'<link rel="icon" type="image/png" sizes="90x90"'
                .' href="../images/icons/90.png?'.$revisions['images/icons/90.png'].'" />'
                .'<link rel="icon" type="image/png" sizes="120x120"'
                .' href="../images/icons/120.png?'.$revisions['images/icons/120.png'].'" />'
                .'<link rel="icon" type="image/png" sizes="128x128"'
                .' href="../images/icons/128.png?'.$revisions['images/icons/128.png'].'" />'
                .'<link rel="icon" type="image/png" sizes="256x256"'
                .' href="../images/icons/256.png?'.$revisions['images/icons/256.png'].'" />'
                .'<link rel="icon" type="image/png" sizes="512x512"'
                .' href="../images/icons/512.png?'.$revisions['images/icons/512.png'].'" />'
                .$head
            .'</head>'
            ."<body>$body</body>"
        .'</html>';

}
