#!/bin/bash
set -e

echo "TD Docker – Build & Deploy"

# ------------------- var -------------------
API_IMAGE="app-td-api"
FRONT_IMAGE="app-td-front"
API_URL="http://localhost:3000"

# ------------------- docker check -------------------
echo "Checking Docker..."
docker info > /dev/null 2>&1 || {
  echo "Docker is not running"
  exit 1
}

# ------------------- validate docker-compose.yml -------------------
echo "Validating docker-compose.yml..."
docker compose config > /dev/null

#------------------- build images -------------------
echo "Building API image..."
docker build -t $API_IMAGE ./api

echo "Building Front image..."
docker build \
  --build-arg VITE_API_URL=$API_URL \
  -t $FRONT_IMAGE \
  ./front

# ------------------- reset db -------------------
read -p "Reset database volume? (y/N): " RESET_DB

if [[ "$RESET_DB" == "y" || "$RESET_DB" == "Y" ]]; then
  echo "Removing containers and volumes..."
  docker compose down -v
else
  echo "Keeping existing database volume"
  docker compose down
fi

# ------------------- deploy stack -------------------
echo "Starting stack..."
docker compose up -d

# ------------------- status -------------------
echo "Containers status:"
docker compose ps

echo "Services available:"
echo "  - API   → http://localhost:3000/status"
echo "  - Front → http://localhost:8080"

echo "Deployment finished successfully"
