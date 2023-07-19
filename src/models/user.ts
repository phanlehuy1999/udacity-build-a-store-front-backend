import bcrypt from "bcrypt";
// @ts-ignore
import Client from "../database";

export interface User {
  id?: number;
  username?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
}

export class UserMapping {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";
      const { rows } = await conn.query(sql);
      conn.release();
      return rows;
    } catch (err) {
      throw new Error(`Could not get users. ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    const { username, firstname, lastname, password } = user;
    try {
      const sql =
        "INSERT INTO users (username, firstname, lastname, password_digest) VALUES($1, $2, $3, $4) RETURNING *";
      const hashPassword = bcrypt.hashSync(
        password + ((process.env.BCRYPT_PASSWORD as string) || ""),
        parseInt(process.env.SALT_ROUNDS as string)
      );
      console.log(hashPassword);
      // @ts-ignore
      const conn = await Client.connect();
      const { rows } = await conn.query(sql, [
        username,
        firstname,
        lastname,
        hashPassword,
      ]);
      console.log(rows);
      conn.release();
      return rows[0];
    } catch (err) {
      throw new Error(
        `Could not create new user ${firstname} ${lastname}. ${err}`
      );
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const { rows } = await conn.query(sql, [id]);
      conn.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. ${err}`);
    }
  }

  async edit(updateUser: User): Promise<User> {
    try {
      const sql =
        "UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();
      const { rows } = await conn.query(sql, [
        updateUser.firstname,
        updateUser.lastname,
        updateUser.id,
      ]);
      conn.release();
      return rows[0];
    } catch (err) {
      throw new Error(
        `Could not edit user ${updateUser.firstname} ${updateUser.lastname}. ${err}`
      );
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const { rows } = await conn.query(sql, [id]);
      conn.release();
      return rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id}. ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const sql = "SELECT password_digest FROM users WHERE username=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const { rows } = await conn.query(sql, [username]);
      if (rows.length) {
        const user = rows[0];
        if (
          bcrypt.compareSync(
            password + process.env.BCRYPT_PASSWORD,
            user.password_digest
          )
        ) {
          return user;
        }
      }
      conn.release();
      return null;
    } catch (err) {
      throw new Error(`Authen failed for user ${username}. ${err}`);
    }
  }
}
