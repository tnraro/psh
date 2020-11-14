import { Pool } from "mysql2/promise";
import { IDBUser } from "@psh/schema/dist/src/utils";

export interface IContext {
    pool: Pool;
    session: {
        access_token: string;
        user: IDBUser;
    } | null;
}