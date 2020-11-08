import { IResponse } from "@psh/schema"
import { Pool } from "mysql2/promise"

export interface IContext {
    pool: Pool;
}

export type Resolver<TArgs = any, TResponse = IResponse> = (parent: any, args: TArgs, context: IContext, info: any) => Promise<TResponse>