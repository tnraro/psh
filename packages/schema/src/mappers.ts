import { Device, Home, Roles, Terms, User } from "./resolvers.gen";

export type MappedDevice = {
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

export type MappedHome = {
    __typename: "Home",
    id: string,
    name: string,
    admins?: User[],
    devices?: Device[],
    family?: User[]
}

export type MappedUser = {
    __typename: "User",
    id: string,
    email: string,
    username: string,
    terms: Terms,
    homeId?: string
    devices?: Device[],
    home?: Home,
    roles?: Roles
}