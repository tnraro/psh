/*
import { Resolver } from "./types";
import { IDBUser, ISignInUserInput, ISignInUserResponse, IUser } from "@psh/schema";
import { RowDataPacket } from "mysql2";
import { buildSchemaFromTypeDefinitions, UserInputError } from "apollo-server";
import { compare } from "bcrypt";
import { find, gen } from "../sessions";

export interface IArgs {
    user: ISignInUserInput
}

const resolver: Resolver<IArgs, ISignInUserResponse> = async (parent, args, context, info) => {
    try {
        const [rows] = await context.pool.execute(
            "SELECT * FROM `customer`.`User` WHERE `email`=?;",
            [args.user.email]);
        const user: IDBUser = (<RowDataPacket>(rows))[0];

        if (!user) {
            return {
                code: "401",
                success: false,
                message: "Unauthorized"
            };
        }
        
        const match = await compare(args.user.password, user.hashedPassword);
    
        console.log(match, user);
    
        if (!match) {
            return {
                code: "401",
                success: false,
                message: "Unauthorized"
            };
        }
    
        // TODO: generate token
    
        return {
            code: "200",
            success: true,
            session: {
                token: user.tnid,
                user: {
                    id: user.tnid,
                    email: user.email,
                    homeId: user.homeId,
                    username: user.username,
                    terms: user.terms
                }
            }
        };
    } catch (e: any) {
        return {
            code: "500",
            success: false,
            session: e.message
        };
    }
};

export default resolver;
*/