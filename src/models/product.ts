// @ts-ignore
import Client from "../database";

export interface Product {
  id?: number;
  name: string;
  price: number;
}

export class ProductMapping {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";
      const { rows } = await conn.query(sql);
      conn.release();
      return rows;
    } catch (err) {
      throw new Error(`Could not get products. ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const { rows } = await conn.query(sql, [id]);
      conn.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();
      const { rows } = await conn.query(sql, [product.name, product.price]);
      conn.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not create new product ${product.name}. ${err}`);
    }
  }

  async edit(updateProduct: Product): Promise<Product> {
    const { id, name, price } = updateProduct;
    try {
      const sql =
        "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();
      const { rows } = await conn.query(sql, [name, price, id]);
      conn.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not update product ${name}. ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const { rows } = await conn.query(sql, [id]);
      conn.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not delete product ${id}. ${err}`);
    }
  }
}
