import { User } from "@psh/db";
import { mappers } from "@psh/schema";

export const mapUser = (user: User.IDBUser): mappers.MappedUser => {
    return {
        __typename: "User",
        id: user.tnid,
        email: user.email,
        username: user.username,
        terms: user.terms,
        homeId: user.homeId
    };
};
