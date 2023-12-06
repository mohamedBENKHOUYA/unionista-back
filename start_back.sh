docker compose --file /srv/back/current/docker-compose.yml down --remove-orphans
NETWORK_NAME=unionistashop_network
if [ -z $(docker network ls --filter name=^${NETWORK_NAME}$ --format="{{ .Name }}") ] ; then 
     docker network create --driver bridge ${NETWORK_NAME} ; 
fi
docker compose --file /srv/back/current/docker-compose.yml up --build