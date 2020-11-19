import { IDBUser } from "@psh/db/dist/User";
import { Pool } from "mysql2/promise";

export interface IContext {
    pool: Pool;
    session: {
        access_token: string;
        user: IDBUser;
    } | null;
}