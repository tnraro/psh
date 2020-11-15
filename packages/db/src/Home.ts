import { Pool } from "mysql2/promise";

export interface IDBHome {
    tnid: string;
    name: string;
}
export const getHomeById = async (pool: Pool, id: string): Promise<IDBHome | null> => {
    const [rows] = await pool.execute("SELECT * FROM `customer`.`Home` WHERE `tnid`=?", [
        id
    ]);
    const home = (<IDBHome[]>rows)[0];
    return home;
}
export const getHomeByUserId = async (pool: Pool, id: string): Promise<IDBHome | null> => {
    const QUERY = "SELECT * FROM `customer`.`Home` WHERE `tnid`=(SELECT `homeId` FROM `customer`.`User` WHERE `tnid`=?);";
    const [rows] = await pool.execute(QUERY, [id]);
    const home = (<IDBHome[]>rows)[0];
    return home;
}