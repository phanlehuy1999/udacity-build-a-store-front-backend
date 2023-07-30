# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints
#### Products
- Index (GET `/api/products` )
- Show (GET `/api/products/:id`)
- Create [token required] (POST `/api/products/create`)
- Update [token required] (PUT `/api/products/:id`)
- Delete [token required] (DELETE `/api/products/:id`)

#### Users
- Index [token required] (GET `/api/users`)
- Show [token required] (GET `/api/users/:id`)
- Create (POST `/api/users/create`)
- Update [token required] (PUT `/api/users/:id`)
- Delete [token required] (DELETE `/api/users/:id`)
- Authenticate (POST `/api/users/authenticate`)

#### Order
- Index [token required] (GET `/api/orders`)
- Show [token required] (GET `/api/orders/:id`)
- Create [token required] (POST `/api/orders/create`)
- Update [token required] (PUT `/api/orders/:id`)
- Delete [token required] (DELETE `/api/orders/:id`)
- Current Order by user (args: user id)[token required] (GET `/api/orders/user/:user_id`)

## Data Shapes
#### Product
The table includes the following fields:
- id
- name
- price
  The SQL schema for this table is as follows:
```sql
CREATE TABLE products (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(100) NOT NULL,
  price INTEGER      NOT NULL
);
```

#### User
The table includes the following fields:
- id
- username
- firstName
- lastName
- password
  The SQL schema for this table is as follows:
```sql
CREATE TABLE users (
  id                SERIAL PRIMARY KEY,
  username          VARCHAR(100) NOT NULL,
  firstname         VARCHAR(100) NOT NULL,
  lastname          VARCHAR(100) NOT NULL,
  password_digest   VARCHAR NOT NULL
);
```

#### Orders
The table includes the following fields:
- id
- user_id
- status of order (active or complete)
  The SQL schema for this table is as follows:
```sql
CREATE TABLE orders (
  id      SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id),
  status  BOOLEAN NOT NULL
);
```

#### order_products
The table includes the following fields:
- id
- order_id
- product_id
- quantity
  The SQL schema for this table is as follows:
```sql
CREATE TABLE order_products (
  order_id   INTEGER NOT NULL REFERENCES orders (id),
  product_id INTEGER NOT NULL REFERENCES products (id),
  quantity   INTEGER NOT NULL
);
```