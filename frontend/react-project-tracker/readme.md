# MVP - Project Budget Tracker

## Setup

### The database

The included docker-compose file will run a Postgres database server. The
following command will start the docker container and database server:

```bash
docker compose up -d
```

If you want to absolutely, positively make sure that you don't have any
problems with previous docker containers, databases, etc, run the
following commands **before** running the command above.

```bash
# kill all running containers
docker kill $(docker ps -q)

# remove all artifacts for all stopped containers
docker system prune -af
```

To connect to the psql shell on the database server

```bash
docker exec -it postgres_db psql -U postgres
```

### The FastAPI app

This project requires these libraries:

- "fastapi[standard]"
- psycopg
- sqlalchemy

This command will run the FastAPI server:

```bash
fastapi dev main.py
```
