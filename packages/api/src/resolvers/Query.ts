import { IContext } from "./types";
import type { Query, QueryResolvers, User } from "@psh/schema/dist/generated/resolvers";
import { AuthenticationError, UserInputError } from "apollo-server";
import { getUserById } from "@psh/db/dist/User";
import { mapUser } from "../mappers/User";
import { PshError } from "../errors";
import { StatusCodes } from "http-status-codes";
const resolvers: QueryResolvers<IContext> = {
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