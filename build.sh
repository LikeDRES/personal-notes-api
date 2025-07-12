#!/bin/bash

echo "Limpiando contenedores y volúmenes anteriores..."
docker-compose down --volumes --remove-orphans

echo "Reconstruyendo imágenes sin usar caché..."
docker-compose build --no-cache

echo "Levantando contenedores..."
docker-compose up
