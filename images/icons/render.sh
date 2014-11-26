#!/bin/bash
for i in *.svg
do
    name=`basename $i .svg`
    inkscape --export-png=$name.png $name.svg > /dev/null
    optipng -quiet -o7 -strip all $name.png
done
