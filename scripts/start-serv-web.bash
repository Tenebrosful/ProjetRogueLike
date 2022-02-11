#!/bin/bash

if [[ ! -d "logs" ]]
then
    mkdir logs
fi

if [[ ! -d "logs/serv-web" ]]
then
    mkdir logs/serv-web
fi

timestamp=$(date +%d_%m_%Y_%H_%M_%S)

cd web-server

ts-node src/serv-web/server.ts > logs/serv-web/$timestamp.log 2>&1