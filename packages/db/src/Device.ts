import { Pool, ResultSetHeader } from "mysql2/promise";

export interface IDBDevice {
    tnid: string;
    typeId: string;
    alias?: string;
    homeId: string;
    ownerId?: string;
    status: string;
    // online: string;
    // lastOnline: string;
}
export interface IDBDeviceType {
    tnid: string;
    type: string;
    name: string;
    defaultStatus: string;
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
        "INSERT INTO `customer`.`Device` (`tnid`, `homeId`, `ownerId`, `status`, `alias`, `typeId`) VALUES (?,?,?,?,?,?);",
        [
            device.tnid,
            device.homeId,
            device.ownerId || null,
            device.status,
            device.alias || null,
            device.typeId
        ]
    );
};
export const deleteDevice = async (pool: Pool, id: string) => {
    return await pool.execute(
        "DELETE FROM `customer`.`Device` WHERE (`tnid`=?);",
        [id]
    );
};
export const getDeviceTypes = async (pool: Pool) => {
    const [rows] = await pool.execute("SELECT * FROM `customer`.`DeviceType`;");
    const types = <IDBDeviceType[]>rows;
    return types;
};
export const getDeviceTypeById = async (pool: Pool, id: string) => {
    const [
        rows
    ] = await pool.execute(
        "SELECT * FROM `customer`.`DeviceType` WHERE (`tnid`=?);",
        [id]
    );
    const deviceType = (<IDBDeviceType[]>rows)[0];
    return deviceType;
};
export const updateDeviceStatus = async (
    pool: Pool,
    deviceId: string,
    status: string
) => {
    const QUERY = "UPDATE `customer`.`Device` SET `status`=? WHERE (`tnid`=?);";
    const [result]: [ResultSetHeader, any] = await pool.execute(QUERY, [
        status,
        deviceId
    ]);

    if (result.affectedRows === 0) {
        throw new Error("NO_USER_CHANGED");
    }

    return status;
};
