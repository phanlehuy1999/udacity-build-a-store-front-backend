import { Application } from "express";
import { verifyAuthToken } from "../utils";

import {
  getAllUser,
  createUser,
  getUserDetail,
  updateUser,
  deleteUser,
  authenticate,
} from "./user-routes";

import {
  getAllProduct,
  createProduct,
  getProductDetail,
  updateProduct,
  deleteProduct,
} from "./product-routes";

import {
  getAllOrder,
  createOrder,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
} from "./order-routes";

export function initUserRoutes(app: Application) {
  app.get("/api/users", verifyAuthToken, getAllUser);
  app.post("/api/users/create", createUser);
  app.get("/api/users/:id", verifyAuthToken, getUserDetail);
  app.put("/api/users/:id", verifyAuthToken, updateUser);
  app.delete("/api/users/:id", verifyAuthToken, deleteUser);
  app.post("/api/users/authenticate", authenticate);
}

export function initProductRoutes(app: Application) {
  app.get("/api/products", getAllProduct);
  app.post("/api/products/create", verifyAuthToken, createProduct);
  app.get("/api/products/:id", getProductDetail);
  app.put("/api/products/:id", verifyAuthToken, updateProduct);
  app.delete("/api/products/:id", verifyAuthToken, deleteProduct);
}

export function initOrderRoutes(app: Application) {
  app.get("/api/orders", verifyAuthToken, getAllOrder);
  app.post("/api/orders/create", verifyAuthToken, createOrder);
  app.get("/api/orders/user/:user_id", verifyAuthToken, getOrdersByUserId);
  app.put("/api/orders/:id", verifyAuthToken, updateOrder);
  app.delete("/api/orders/:id", verifyAuthToken, deleteOrder);
}
