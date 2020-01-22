# GetUP Backend

## To run

Create a `.env` file from the `.env.example` file, and edit as needed.

```
docker-compose up
```

## To setup database

```
docker exec <container_name> flask db init
```

## Migrate database

```
docker exec <container_name> flask db migrate -m "migration message"
docker exec <container_name> flask db upgrade
```

## Reset databse

```
docker exec <container_name> flask resetdb
```
