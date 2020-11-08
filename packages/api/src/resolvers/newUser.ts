import tnid from "tnid";
import bcrypt from "bcrypt";
import { Resolver } from "./types";
import { INewUserInput, INewUserResponse, IUser } from "@psh/schema";

export interface IArgs {
    user: INewUserInput
}

const resolver: Resolver<IArgs, INewUserResponse> = async (parent, args, context, info) => {
    //TODO: request validation
    const id = tnid(4);
    const user: IUser = {
        id,
        email: args.user.email,
        username: args.user.username,
        terms: {
            agelimit: args.user.terms.agelimit,
            usepolicy: args.user.terms.usepolicy,
            privacy: args.user.terms.privacy,
            promotion: args.user.terms.promotion
        }
    };

    const hashedPassword = await bcrypt.hash(args.user.password, 10);
    
    try {
        await context.pool.execute(
            "INSERT INTO `customer`.`User` (`tnid`, `email`, `hashedPassword`, `username`, `terms`) VALUES (?,?,?,?,?);",
            [id, user.email, hashedPassword, user.username, JSON.stringify(user.terms)]);
    } catch (e: any) {
        if (e.code === "ER_DUP_ENTRY") {
            return {
                code: "409",
                success: false,
                message: "Duplicate some entry"
            };
        } else {
            console.error(e);
        }
    }

    return {
        code: "201",
        success: true,
        user
    };
};

export default resolver;