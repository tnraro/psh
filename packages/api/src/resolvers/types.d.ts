import { User } from "@psh/db";
import { Pool } from "mysql2/promise";

export interface IContext {
    pool: Pool;
    session: {
        access_token: string;
        user: User.IDBUser;
    } | null;
}