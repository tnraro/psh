import { IDBUser } from "@psh/db/dist/User";
import { User } from "@psh/schema/dist/generated/resolvers";

export const mapUser = (user: IDBUser): User => {
    return {
        __typename: "User",
        id: user.tnid,
        email: user.email,
        username: user.username,
        terms: user.terms
    };
}