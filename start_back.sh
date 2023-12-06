docker compose --file /srv/back/current/docker-compose.yml down --remove-orphans
#docker network inspect unionistashop_network >/dev/null || docker network create --driver bridge unionistashop_network
NETWORK_NAME=unionistashop_network
if [ -z $(docker network ls --filter name=^${NETWORK_NAME}$ --format="{{ .Name }}") ] ; then 
     docker network --driver bridge create ${NETWORK_NAME} ; 
fi
docker compose --file /srv/back/current/docker-compose.yml up --build