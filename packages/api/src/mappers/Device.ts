import { IDBDevice } from "@psh/db/dist/Device";
import { Home, User } from "@psh/schema/dist/generated/resolvers";

export type DeviceWithID = {
    __typename: "Device",
    id: string,
    type: string,
    alias?: string,
    status: string,
    private: boolean,
    ownerId?: string;
    homeId: string;
    home?: Home;
    owner?: User;
}

export const mapDevice = (device: IDBDevice): DeviceWithID => {
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