import { Roles, Terms } from "./resolvers.gen";

export type MappedDevice = {
    __typename: "Device";
    id: string;
    typeId: string;
    type?: MappedDeviceType;
    alias?: string;
    status: string;
    private: boolean;
    ownerId?: string;
    homeId: string;
    home?: MappedHome;
    owner?: MappedUser;
};
export type MappedDeviceType = {
    __typename: "DeviceType";
    id: string;
    type: string;
    name: string;
};

export type MappedHome = {
    __typename: "Home";
    id: string;
    name: string;
    admins?: MappedUser[];
    devices?: MappedDevice[];
    family?: MappedUser[];
};

export type MappedUser = {
    __typename: "User";
    id: string;
    email: string;
    username: string;
    terms: Terms;
    homeId?: string;
    devices?: MappedDevice[];
    home?: MappedHome;
    roles?: Roles;
};
