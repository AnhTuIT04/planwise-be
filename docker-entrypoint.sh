#!/bin/sh
set -e

echo "Running db:setup (generate clients + push schemas)..."

npm run db:gen

# Retry pg:push until Postgres is ready
for i in 1 2 3 4 5 6 7 8 9 10; do
  if npm run pg:push; then
    echo "PostgreSQL schema pushed."
    break
  fi
  echo "  pg:push failed (attempt $i/10), retrying in 3s..."
  sleep 3
done

# Retry mongo:push until Mongo replica set primary is ready
for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15; do
  if npm run mongo:push; then
    echo "MongoDB schema pushed."
    break
  fi
  echo "  mongo:push failed (attempt $i/15), retrying in 5s..."
  sleep 5
done

echo "Database setup complete. Starting application..."
exec "$@"
