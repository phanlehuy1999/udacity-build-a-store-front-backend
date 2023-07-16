import jwt, { Secret } from "jsonwebtoken";
import { User } from "../models/user";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

export const createUserAuthenToken = (user: User) => {
  return jwt.sign(
    { username: user.username, password: user.password },
    process.env.TOKEN_SECRET as Secret
  );
};

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).json({ error: "Invalid token" });
    return false;
  }
  try {
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as Secret);
    next();
  } catch (err) {
    res.status(401);
    res.json(`Invalid token. ${err}`);
    return;
  }
};
