import { Pool } from "mysql2/promise";

export interface IDBUser {
    tnid: string;
    email: string;
    hashedPassword: string;
    username: string;
    homeId?: string;
    terms: {
        privacy: boolean;
        agelimit: boolean;
        promotion: boolean;
        usepolicy: boolean;
    }
}

export const getUserById = async (pool: Pool, id: string): Promise<IDBUser | null> => {
    const [rows] = await pool.execute("SELECT * FROM `customer`.`User` WHERE `tnid`=?", [
        id
    ]);
    const user = (<IDBUser[]>rows)[0];
    return user;
}
export const getUserByEmail = async (pool: Pool, email: string): Promise<IDBUser | null> => {
    const [rows] = await pool.execute("SELECT * FROM `customer`.`User` WHERE `email`=?", [
        email
    ]);
    const user = (<IDBUser[]>rows)[0];
    return user;
}
export const newUser = async (pool: Pool, user: IDBUser) => {
    return await pool.execute(
        "INSERT INTO `customer`.`User` (`tnid`, `email`, `hashedPassword`, `username`, `terms`) VALUES (?,?,?,?,?);",
        [user.tnid, user.email, user.hashedPassword, user.username, JSON.stringify(user.terms)]
    );
}