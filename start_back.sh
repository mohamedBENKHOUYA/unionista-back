
docker compose --file /srv/back/current/docker-compose.yml down
# remove existed volumes
VOLUMES=$(docker volume ls | awk 'NR>1{print $2}' | awk 'BEGIN { ORS = " " } { print }');
docker volume rm $VOLUMES;

# create network(between front & back) if it does not exist already.
NETWORK_NAME=unionistashop_network
if [ -z $(docker network ls --filter name=^${NETWORK_NAME}$ --format="{{ .Name }}") ] ; then 
     docker network create --driver bridge ${NETWORK_NAME} ; 
fi

# rebuild db only if do not it exist already
if [ -z $(docker ps --filter name=postgres --format="{{ .Names }}") ] ; then 
     docker compose --file /srv/back/current/docker-compose.yml down --remove-orphans
     docker compose --file /srv/back/current/docker-compose.yml --profile static up --build
else 
     docker compose --file /srv/back/current/docker-compose.yml up
fi