import { IDBDevice } from "@psh/db/dist/Device";
import { MappedDevice } from "@psh/schema/dist/src/mappers";

export const mapDevice = (device: IDBDevice): MappedDevice => {
    return {
        __typename: "Device",
        id: device.tnid,
        type: device.type,
        alias: device.alias,
        status: device.status,
        private: !!device.ownerId,
        ownerId: device.ownerId,
        homeId: device.homeId
    };
}