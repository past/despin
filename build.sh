#!/bin/sh
#
# A simple build script for Despin
#
NAME=despin
XPI=$NAME.xpi
BUILD_DIR=build

mkdir -p $BUILD_DIR
rm $BUILD_DIR/$XPI >/dev/null 2>&1
cd src
zip -qDr ../$BUILD_DIR/$XPI .
cd ..

