import { IDBUser } from "@psh/schema/dist/src/utils";
import { Pool } from "mysql2/promise";

export interface IContext {
    pool: Pool;
    session: {
        access_token: string;
        user: IDBUser;
    } | null;
}