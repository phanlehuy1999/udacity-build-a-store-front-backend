import Client from "../database";

export interface Order {
  id?: number;
  product_id?: number;
  quantity?: number;
  user_id?: number;
  status: boolean;
}

export class OrderMapping {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";
      const { rows } = await conn.query(sql);
      conn.release();
      return rows;
    } catch (err) {
      throw new Error(`Could not get orders. ${err}`);
    }
  }

  async showByUserId(id: number): Promise<Order[]> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id=($1)";
      const conn = await Client.connect();
      const { rows } = await conn.query(sql, [id]);
      conn.release();
      return rows;
    } catch (err) {
      throw new Error(`Could not find order by user_id ${id}. ${err}`);
    }
  }

  async create(newOrder: Order): Promise<Order> {
    const { product_id, quantity, user_id, status } = newOrder;
    try {
      const sql =
        "INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *";
      const conn = await Client.connect();
      const { rows } = await conn.query(sql, [
        product_id,
        quantity,
        user_id,
        status,
      ]);
      conn.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not create new order. ${err}`);
    }
  }

  async edit(updateOrder: Order): Promise<Order> {
    const { id, status } = updateOrder;
    try {
      const sql = "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *";
      const conn = await Client.connect();
      const { rows } = await conn.query(sql, [status, id]);
      conn.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not update order. ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1)";
      const conn = await Client.connect();
      const { rows } = await conn.query(sql, [id]);
      conn.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. ${err}`);
    }
  }
}
