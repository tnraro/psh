/*
import { Resolver } from "../types";
import { IDBUser, IUserResponse } from "@psh/schema";
import { RowDataPacket } from "mysql2/promise";

export interface IArgs {
    
}

const resolver: Resolver<IArgs, IUserResponse> = async (parent, args, context, info) => {
    try {
        const token = context.auth.token;
        const id = token;

        const [rows] = await context.pool.execute(
            "SELECT * FROM `customer`.`User` WHERE `tnid`=?;",
            [id]);
        const user: IDBUser = (<RowDataPacket>(rows))[0];
        console.log(token, id, user);

        if (!user)
            throw new Error("Unauthorized");
        return {
            code: "200",
            success: true,
            user: {
                id: user.tnid,
                email: user.email,
                homeId: user.homeId,
                username: user.username,
                terms: user.terms
            }
        };
    } catch (e: any) {
        return {
            code: "401",
            success: false,
            message: e.message
        };
    }
};

export default resolver;
*/