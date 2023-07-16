# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: `'api/products' [GET]`
- Show: `'api/products/:id' [GET]`
- Create (args: Product)[token required]: `'api/products/create' [POST] (token)`
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)
- [ADDED] Update (args: Product)[token required]: `'api/products/:id  [PUT] (token)`
- [ADDED] Delete [token required]: `'api/products/:id  [DELETE] (token)`

#### Users

- Index [token required]: `'api/users' [GET] (token)`
- Show [token required]: `'api/users/:id' [GET] (token)`
- Create N[token required]: `'api/users/create' [POST] (token)`
- [ADDED] Update (args: User) [token required]: `'api/users/:id' [PUT] (token)`
- [ADDED] Delete [token required]: `'api/users/:id' [DELETE] (token)`
- [ADDED] Authenticate (args: User) [token required]: `'api/users/authenticate' [POST] (token)`

#### Orders

- Index [token required]: `'api/orders' [GET]`
- Current Orders by user (args: user_id)[token required]: `'api/orders/user/:user_id' [GET]`
- Create (args: Order)[token required]: `'api/orders/create' [POST] (token)`
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
- [ADDED] Completed order by id (args: Order)[token required]: `'/api/orders/:id' [PUT]`
- [ADDED] Delete [token required]: `'api/orders/:id  [DELETE] (token)`

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

```
Table: Product (id:serial[primary key], name:varchar(100)[not null], price:integer[not null])
```

#### User

- id
- [ADDED] username
- firstname
- lastname
- password

```
Table: User (id:serial[primary key], username: varchar (100)[not null], firstname: varchar (100)[not null], lastname:varchar(100)[not null], password_digest:varchar[not null])
```

#### Orders

- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

```
Table: Orders (id:serial[primary key], user_id:integer(foreign key to users table), status:boolean[not null])
```

#### Table: order_products

- order_id
- product_id
- quantity

```
Table: Order Product (order_id:integer(foreign key to orders table), product_id:integer(foreign key to products table)
, quantity:integer[not null])
```
