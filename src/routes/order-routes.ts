import { Request, Response } from "express";
import { Order, OrderMapping } from "../models/order";

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
      product_id: req.body.product_id as unknown as number,
      quantity: req.body.quantity as unknown as number,
      user_id: req.body.user_id as unknown as number,
      status: req.body.status as unknown as boolean,
    } as Order;
    if (
      !newOrder.product_id ||
      !newOrder.quantity ||
      !newOrder.user_id ||
      newOrder.status === undefined
    ) {
      res.status(400);
      res.send("Missing param product_id or quantity or user_id or status");
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
      status: req.body.status as unknown as boolean,
    };
    if (!updateOrder.id || updateOrder.status === undefined) {
      res.status(400);
      res.send("Missing param id or status!");
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
