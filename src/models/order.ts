import Client from "../database";

export interface OrderProduct {
  product_id: number;
  quantity: number;
}

export interface Order {
  id?: number;
  order_products?: OrderProduct[];
  user_id?: number;
  status: boolean;
}

export class OrderMapping {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const { rows } = await conn.query("SELECT * FROM orders");
      const ordersRows = rows;
      const orders: Order[] = [];
      for (const order of ordersRows) {
        const { rows } = await conn.query(
          "SELECT product_id, quantity FROM order_products WHERE order_id=($1)",
          [order.id]
        );
        orders.push({
          ...order,
          order_products: rows,
        });
      }
      conn.release();
      return orders;
    } catch (err) {
      throw new Error(`Could not get orders. ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    const { order_products, status, user_id } = order;
    try {
      const conn = await Client.connect();
      const { rows } = await conn.query(
        "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *",
        [user_id, status]
      );
      const order = rows[0];
      const orderProducts = [];
      for (const product of order_products || []) {
        const { product_id, quantity } = product;
        const { rows } = await conn.query(
          "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity",
          [order.id, product_id, quantity]
        );
        orderProducts.push(rows[0]);
      }
      conn.release();
      return {
        ...order,
        order_products: orderProducts,
      };
    } catch (err) {
      throw new Error(`Could not add new order for user ${user_id}. ${err}`);
    }
  }

  async showByUserId(user_id: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const orderResult = await conn.query(
        "SELECT * FROM orders WHERE user_id=($1)",
        [user_id]
      );
      const ordersRows = orderResult.rows;
      const orders: Order[] = [];
      for (const order of ordersRows) {
        const { rows } = await conn.query(
          "SELECT product_id, quantity FROM order_products WHERE order_id=($1)",
          [order.id]
        );
        orders.push({
          ...order,
          order_products: rows,
        });
      }
      conn.release();
      return orders;
    } catch (err) {
      throw new Error(`Could not find orders of user_id ${user_id}. ${err}`);
    }
  }

  async edit(order: Order): Promise<Order> {
    const { id, user_id, status } = order;
    try {
      const conn = await Client.connect();
      const orderResult = await conn.query(
        "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
        [status, id]
      );
      const order = orderResult.rows[0];
      const orderProductsResult = await conn.query(
        "SELECT product_id, quantity FROM order_products WHERE order_id=($1)",
        [id]
      );
      conn.release();
      return {
        ...order,
        order_products: orderProductsResult.rows,
      };
    } catch (err) {
      throw new Error(`Could not update order for user ${user_id}. ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      await conn.query("DELETE FROM order_products WHERE order_id=($1)", [id]);
      const { rows } = await conn.query("DELETE FROM orders WHERE id=($1)", [
        id,
      ]);
      conn.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. ${err}`);
    }
  }
}
