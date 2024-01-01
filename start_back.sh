docker compose --file /srv/back/current/docker-compose.yml down
NETWORK_NAME=unionistashop_network
if [ -z $(docker network ls --filter name=^${NETWORK_NAME}$ --format="{{ .Name }}") ] ; then 
     docker network create --driver bridge ${NETWORK_NAME} ; 
fi
if [ -z $(docker ps --filter name=postgres --format="{{ .Names }}" )]; then 
     docker compose --file /srv/back/current/docker-compose.yml up --build
else 
    docker compose --file /srv/back/current/docker-compose.yml --profile static up --build
fi
