#!/bin/bash 

docker rmi team_brando/open_api
docker kill api
docker rm api

docker build -t team_brando/opon_api .
docker run -d --name api --link db:db -p 3000:3000 team_brando/opon_api
docker ps -a
docker logs api
