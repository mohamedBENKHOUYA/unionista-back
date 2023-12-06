docker compose --file /srv/back/current/docker-compose.yml down --remove-orphans
docker network remove unionistashop_network
docker network create --driver bridge unionistashop_network
docker compose --file /srv/back/current/docker-compose.yml up --build