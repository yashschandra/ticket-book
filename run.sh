#!/bin/bash

DIR=$(pwd)
pkill chrome
google-chrome --restore-last-session --load-extension="$DIR" 
