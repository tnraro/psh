import { User, Home } from "@psh/db";
import type { resolvers } from "@psh/schema";
import bcrypt, { compare } from "bcrypt";
import { StatusCodes } from "http-status-codes";
import tnid from "tnid";
import { PshError } from "../errors";
import { mapUser } from "../mappers/User";
import { mapHome } from "../mappers/Home";

const resolver: resolvers.MutationResolvers = {
    async newUser(_, args, { pool }) {
        if (!(args.user.agelimit && args.user.usepolicy && args.user.privacy)) {
            throw PshError(StatusCodes.BAD_REQUEST);
        }

        const user: User.IDBUser = {
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
            await User.newUser(pool, user);
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
    async signInUser(_, args, { pool }) {
        const user = await User.getUserByEmail(pool, args.user.email);

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
    },
    async newHome(_, args, context) {
        if (!context.session)
            throw PshError(StatusCodes.UNAUTHORIZED);
        const id = tnid(4);
        const home: Home.IDBHome = {
            tnid: id,
            name: args.name
        };

        try {
            await Home.createHome(context.pool, home, context.session.user.tnid);
        } catch(e) {
            if (e === "NO_USER_CHANGED") {
                throw PshError(StatusCodes.UNAUTHORIZED);
            } else {
                throw PshError(StatusCodes.INTERNAL_SERVER_ERROR);
            }
        }

        return mapHome(home);
    },
    async joinHome(_, args, context) {
        if (!context.session)
            throw PshError(StatusCodes.UNAUTHORIZED);
        const home = await Home.getHomeById(context.pool, args.home);
        if (!home)
            throw PshError(StatusCodes.BAD_REQUEST);
        await Home.joinHome(context.pool, home.tnid, context.session.user.tnid);
        return mapHome(home);
    }
};

export default resolver;