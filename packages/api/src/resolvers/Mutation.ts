import tnid from "tnid";
import bcrypt, { compare } from "bcrypt";
import { IContext } from "./types";
import type { Mutation, MutationResolvers } from "@psh/schema/dist/generated/resolvers";
import { ApolloError, UserInputError } from "apollo-server";
import { getUserByEmail, IDBUser, newUser } from "@psh/db/dist/User";
import { mapUser } from "../mappers/User";
import { PshError } from "../errors";
import { StatusCodes } from "http-status-codes";

const resolvers: MutationResolvers<IContext> = {
    async newUser(parent, args, { pool }) {
        if (!(args.user.agelimit && args.user.usepolicy && args.user.privacy)) {
            throw PshError(StatusCodes.BAD_REQUEST);
        }

        const user: IDBUser = {
            tnid: tnid(4),
            email: args.user.email,
            username: args.user.username,
            terms: {
                agelimit: args.user.agelimit,
                usepolicy: args.user.usepolicy,
                privacy: args.user.privacy,
                promotion: args.user.promotion,
            },
            hashedPassword: await bcrypt.hash(args.user.password, 10)
        };

        try {
            await newUser(pool, user);
        } catch (e: any) {
            if (e.code === "ER_DUP_ENTRY") {
                throw PshError(StatusCodes.CONFLICT);
            } else {
                console.error(e);
                throw PshError(StatusCodes.INTERNAL_SERVER_ERROR);
            }
        }

        return {
            access_token: user.tnid,
            user: mapUser(user)
        };
    },
    async signInUser(parent, args, { pool }) {
        const user = await getUserByEmail(pool, args.user.email);

        if (!user) {
            throw PshError(StatusCodes.UNAUTHORIZED);
        }
        
        const match = await compare(args.user.password, user.hashedPassword);
    
        if (!match) {
            throw PshError(StatusCodes.UNAUTHORIZED);
        }
    
        // TODO: generate access_token
    
        return {
            access_token: user.tnid,
            user: mapUser(user)
        };
    }
};

export default resolvers;