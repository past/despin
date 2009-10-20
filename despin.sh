#!/bin/sh
CURDIR=`pwd`
cd `dirname $1`
FILE=`pwd -P`/`basename $1`
cd $CURDIR
URL="chrome://despin/content/editor.html#"$FILE
firefox -chrome "$URL"
