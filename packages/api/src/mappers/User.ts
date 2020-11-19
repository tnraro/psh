import { IDBUser } from "@psh/db/dist/User";
import { MappedUser } from "@psh/schema/dist/src/mappers";

export const mapUser = (user: IDBUser): MappedUser => {
    return {
        __typename: "User",
        id: user.tnid,
        email: user.email,
        username: user.username,
        terms: user.terms,
        homeId: user.homeId
    };
}