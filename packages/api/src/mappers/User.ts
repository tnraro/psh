import { IDBUser } from "@psh/db/dist/User";
import { Device, Home, Roles, Terms } from "@psh/schema/dist/generated/resolvers";

export type UserWithID = {
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

export const mapUser = (user: IDBUser): UserWithID => {
    return {
        __typename: "User",
        id: user.tnid,
        email: user.email,
        username: user.username,
        terms: user.terms,
        homeId: user.homeId
    };
}