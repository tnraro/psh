import { Device } from "@psh/db";
import { mappers } from "@psh/schema";

export const mapDevice = (device: Device.IDBDevice): mappers.MappedDevice => {
    return {
        __typename: "Device",
        id: device.tnid,
        typeId: device.typeId,
        alias: device.alias,
        status: device.status,
        private: !!device.ownerId,
        ownerId: device.ownerId,
        homeId: device.homeId
    };
};
export const mapDeviceType = (
    device: Device.IDBDeviceType
): mappers.MappedDeviceType => {
    return {
        __typename: "DeviceType",
        id: device.tnid,
        type: device.type,
        name: device.name
    };
};
