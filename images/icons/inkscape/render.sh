#!/bin/bash
cd `dirname $BASH_SOURCE`
for i in *.svg
do
    inkscape --vacuum-defs $i
    inkscape --export-plain-svg=../$i $i
done
