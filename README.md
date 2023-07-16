# udacity-build-a-storefront-backend

The database schema and and API route information can be found in the (REQUIREMENT.md)

## Set up Database

`docker-compose up` to start the docker container
`npm install` to install all dependencies
`npm db-migrate-up` to set up the database and get access via http://127.0.0.1:5432
`npm run watch` to build and run the app

## Environmental Variables Set up

Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you.

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront
POSTGRES_USER=magical_user
POSTGRES_PASSWORD=password123
ENV=dev
BCRYPT_PASSWORD=random-password-phan-le-huy
SALT_ROUNDS=10
TOKEN_SECRET=random-secret-token-phan-le-huy

```

## Start App

`npm run watch`

## Endpoint Access

All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file.

## Token and Authentication

Tokens are passed along with the http header as

```
Authorization   Bearer <token>
```

## Testing

Run test with

`npm run test`

It sets the environment to `test`, migrates up tables for the test database, run the test then migrate down all the tables for the test database.
# udacity-build-a-store-front-backend
# udacity-build-a-store-front-backend
