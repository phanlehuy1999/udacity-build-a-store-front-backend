import { Request, Response } from "express";
import { OrderProduct, Order, OrderMapping } from "../models/order";

const orderMapping = new OrderMapping();

export const getAllOrder = async (req: Request, res: Response) => {
  try {
    const orders: Order[] = await orderMapping.index();
    res.json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = {
      order_products: req.body.order_products as unknown as OrderProduct[],
      status: req.body.status as unknown as boolean,
      user_id: req.body.user_id as unknown as number,
    } as Order;
    if (
      !newOrder.order_products ||
      newOrder.status === undefined ||
      !newOrder.user_id
    ) {
      res.status(400);
      res.send("Missing param order_products or status or user_id");
      return false;
    }
    const order: Order = await orderMapping.create(newOrder);
    res.json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const id = req.params.user_id as unknown as number;
    if (!id) {
      res.status(400);
      res.send("Missing param user_id!");
      return false;
    }
    const orders: Order[] = await orderMapping.showByUserId(id);
    res.json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const updateOrder = {
      id: req.params.id as unknown as number,
      user_id: req.body.user_id as unknown as number,
      status: req.body.status as unknown as boolean,
    };
    if (
      !updateOrder.id ||
      !updateOrder.user_id ||
      updateOrder.status === undefined
    ) {
      res.status(400);
      res.send("Missing param id or user_id or status!");
      return false;
    }
    const order: Order = await orderMapping.edit(updateOrder);
    res.json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (!id) {
      res.status(400);
      res.send("Missing param id!");
      return false;
    }
    await orderMapping.delete(id);
    res.send(`Deleted order ${id}`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
