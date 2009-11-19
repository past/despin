#!/bin/sh
#
# A simple build script for Despin
#
NAME=despin
XPI=$NAME.xpi
BUILD_DIR=build
APP_EXT=app/extensions

# Build extension.
mkdir -p $BUILD_DIR
rm $BUILD_DIR/$XPI >/dev/null 2>&1
cd src
zip -qDr ../$BUILD_DIR/$XPI .
cd ..

# Build application.
rm -r $APP_EXT/despin@astithas.com
cp $BUILD_DIR/$XPI $APP_EXT

