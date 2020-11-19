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
export const createHome = async (pool: Pool, home: IDBHome, userId: string) => {
    const INSERT_QUERY = "INSERT INTO `customer`.`Home` (`tnid`, `name`) VALUES (?,?);";
    const UPDATE_QUERY = "UPDATE `customer`.`User` SET `homeId`=? WHERE (`tnid`=?);";
    
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();
        await connection.execute(INSERT_QUERY, [home.tnid, home.name]);
        const [rows] = await connection.execute(UPDATE_QUERY, [home.tnid, userId]);
        if ((<any[]>rows).length === 0) {
            throw new Error("NO_USER_CHANGED");
        }
        await connection.commit();
        connection.release();
    } catch(e) {
        await connection.rollback();
        connection.release();
        throw new Error(e);
    }
}
export const joinHome = async (pool: Pool, homeId: string, userId: string) => {
    const QUERY = "UPDATE `customer`.`User` SET `homeId`=? WHERE (`tnid`=?);";
    return await pool.execute(QUERY, [homeId, userId]);
}