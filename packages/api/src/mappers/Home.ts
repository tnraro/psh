import { IDBHome } from "@psh/db/dist/Home";
import { Device, User } from "@psh/schema/dist/generated/resolvers";

export type HomeWithID = {
    __typename: "Home",
    id: string,
    name: string,
    admins?: User[],
    devices?: Device[],
    family?: User[]
}

export const mapHome = (home: IDBHome): HomeWithID => {
    return {
        __typename: "Home",
        id: home.tnid,
        name: home.name
    };
}