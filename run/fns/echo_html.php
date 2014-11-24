<?php

function echo_html ($html, $head, $body) {
    header('Content-Type: text/html; charset=UTF-8');
    echo '<!DOCTYPE html>'
        .$html
            .'<head>'
                .'<title>Speedometer</title>'
                .'<meta http-equiv="Content-Type"'
                .' content="text/html; charset=UTF-8" />'
                .'<meta name="viewport" content="width=device-width, user-scalable=no" />'
                .$head
            .'</head>'
            ."<body>$body</body>"
        .'</html>';
}
