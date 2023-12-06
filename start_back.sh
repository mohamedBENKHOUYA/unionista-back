docker compose --file /srv/back/current/docker-compose.yml down --remove-orphans
docker network inspect unionistashop_network >/dev/null || docker network create --driver bridge unionistashop_network
docker compose --file /srv/back/current/docker-compose.yml up --build