import { getUserByEmail, IDBUser, newUser } from "@psh/db/dist/User";
import type { MutationResolvers } from "@psh/schema/dist/generated/resolvers";
import bcrypt, { compare } from "bcrypt";
import { StatusCodes } from "http-status-codes";
import tnid from "tnid";
import { PshError } from "../errors";
import { mapUser } from "../mappers/User";

const resolvers: MutationResolvers = {
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
    },
    tnid() {
        return tnid(4);
    }
};

export default resolvers;