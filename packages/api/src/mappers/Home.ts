import { Home } from "@psh/db";
import { mappers } from "@psh/schema";

export const mapHome = (home: Home.IDBHome): mappers.MappedHome => {
    return {
        __typename: "Home",
        id: home.tnid,
        name: home.name
    };
};
