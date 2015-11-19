#!/bin/bash

sudo service mysql start
sudo php -e -S 127.0.0.1:105 -t . -c .

