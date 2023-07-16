CREATE TABLE orders (
  id          SERIAL PRIMARY KEY,
  product_id  INTEGER NOT NULL REFERENCES products (id),
  quantity    INTEGER NOT NULL,
  user_id     INTEGER NOT NULL REFERENCES users (id),
  status      BOOLEAN NOT NULL
);