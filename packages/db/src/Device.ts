import { Pool } from "mysql2/promise";

export interface IDBDevice {
    tnid: string;
    type: string;
    alias?: string;
    homeId: string;
    ownerId?: string;
    status: string;
    // online: string;
    // lastOnline: string;
}

export const getDeviceById = async (
    pool: Pool,
    id: string
): Promise<IDBDevice | null> => {
    const [
        rows
    ] = await pool.execute("SELECT * FROM `customer`.`Device` WHERE `tnid`=?", [
        id
    ]);
    const device = (<IDBDevice[]>rows)[0];
    return device;
};
export const getDevicesByOwner = async (
    pool: Pool,
    ownerId: string
): Promise<IDBDevice[]> => {
    const [
        rows
    ] = await pool.execute(
        "SELECT * FROM `customer`.`Device` WHERE `ownerId`=?",
        [ownerId]
    );
    const devices = <IDBDevice[]>rows;
    return devices;
};
export const getDevicesByHome = async (
    pool: Pool,
    homeId: string
): Promise<IDBDevice[]> => {
    const [
        rows
    ] = await pool.execute(
        "SELECT * FROM `customer`.`Device` WHERE `homeId`=?",
        [homeId]
    );
    const devices = <IDBDevice[]>rows;
    return devices;
};
export const createDevice = async (pool: Pool, device: IDBDevice) => {
    return await pool.execute(
        "INSERT INTO `customer`.`Device` (`tnid`, `homeId`, `ownerId`, `status`, `alias`, `type`) VALUES (?,?,?,?,?,?);",
        [
            device.tnid,
            device.homeId,
            device.ownerId,
            device.status,
            device.alias,
            device.type
        ]
    );
};
export const deleteDevice = async (pool: Pool, id: string) => {
    return await pool.execute(
        "DELETE FROM `customer`.`Device` WHERE (`tnid`=?);",
        [id]
    );
};
