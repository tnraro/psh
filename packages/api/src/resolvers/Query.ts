import { User } from "@psh/db";
import type { resolvers } from "@psh/schema";
import { StatusCodes } from "http-status-codes";
import { PshError } from "../errors";
import { mapUser } from "../mappers/User";
const resolver: resolvers.QueryResolvers = {
    async user(_, args, context) {
        const user = await User.getUserById(context.pool, args.id);
        if (!user) {
            throw PshError(StatusCodes.BAD_REQUEST);
        }
        return mapUser(user);
    },
    async me(_, args, context) {
        if (!context.session) {
            throw PshError(StatusCodes.UNAUTHORIZED);
        }
        return mapUser(context.session.user);
    }
};

export default resolver;