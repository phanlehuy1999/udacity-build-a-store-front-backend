# udacity-build-a-storefront-backend

The database schema and and API route information can be found in the (REQUIREMENT.md)

## Set up

Need to set up the necessary things first:

To install all dependencies:
`npm install`

To start the docker container:
`docker-compose up`

## Environmental Variables

To satisfy Udacity requirements, the following environment variable are needed.

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront
POSTGRES_DB_TEST=storefront_test
POSTGRES_USER=magical_user
POSTGRES_PASSWORD=password123
ENV=dev
BCRYPT_PASSWORD=random-password-phan-le-huy
SALT_ROUNDS=10
TOKEN_SECRET=random-secret-token-phan-le-huy

```

## Dev Mode

To run the app in dev mode, run the following:

`npm run start`

The application will run on port ```3000``` with database on ```5432```.

If an error "database storefront already exists", run the following:

`npm run drop-dev-db`


## Ports

The application runs on port ```3000``` with database on ```5432```.

## Test Mode

To run the app in test mode, run the following:

`npm run test`

The application will run on port ```3001``` with database on ```5432```.

If an error "database storefront_test already exists", run the following:

`npm run drop-test-db`

## Endpoint Access

All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file.

## Token and Authentication

Tokens are passed along with the http header as

```
Authorization   Bearer <token>
```
