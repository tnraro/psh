import { getUserById } from "@psh/db/dist/User";
import type { QueryResolvers } from "@psh/schema/dist/generated/resolvers";
import { StatusCodes } from "http-status-codes";
import { PshError } from "../errors";
import { mapUser } from "../mappers/User";
const resolvers: QueryResolvers = {
    async user(_, args, context) {
        const user = await getUserById(context.pool, args.id);
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

export default resolvers;