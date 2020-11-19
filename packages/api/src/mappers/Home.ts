import { IDBHome } from "@psh/db/dist/Home";
import { MappedHome } from "@psh/schema/dist/src/mappers";

export const mapHome = (home: IDBHome): MappedHome => {
    return {
        __typename: "Home",
        id: home.tnid,
        name: home.name
    };
}