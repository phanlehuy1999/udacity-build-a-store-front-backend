import { Request, Response } from "express";
import { createUserAuthenToken } from "../utils/index";
import { User, UserMapping } from "../models/user";

const userMapping = new UserMapping();

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users: User[] = await userMapping.index();
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = {
      username: req.body.username as unknown as string,
      password: req.body.password as unknown as string,
      firstname: req.body.firstname as unknown as string,
      lastname: req.body.lastname as unknown as string,
    };

    if (
      !newUser.username ||
      !newUser.password ||
      !newUser.firstname ||
      !newUser.lastname
    ) {
      res.status(400);
      res.send("Missing param username or password or firstname or lastname");
      return false;
    }
    const user: User = await userMapping.create(newUser);
    res.json(createUserAuthenToken(user));
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getUserDetail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (!id) {
      return res.status(400).send("Missing param id.");
    }
    const user: User = await userMapping.read(id);
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updateUser = {
      id: req.params.id as unknown as number,
      firstname: req.body.firstname as unknown as string,
      lastname: req.body.lastname as unknown as string,
    };
    if (!updateUser.id || !updateUser.firstname || !updateUser.lastname) {
      res.status(400);
      res.send("Missing param id or firstname or lastname");
      return false;
    }
    const user: User = await userMapping.edit(updateUser);
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (!id) {
      res.status(400).send("Missing param id");
      return false;
    }
    await userMapping.delete(id);
    res.send(`Deleted user ${id}`);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const authenticate = async (req: Request, res: Response) => {
  try {
    const username = req.body.username as unknown as string;
    const password = req.body.password as unknown as string;
    if (!username || !password) {
      res.status(400);
      res.send("Missing param username or password");
      return false;
    }
    const user: User | null = await userMapping.authenticate(
      username,
      password
    );
    if (!user) {
      return res.status(401).send(`Wrong password!`);
    }
    res.json(createUserAuthenToken(user));
  } catch (err) {
    res.status(400).json(err);
  }
};
