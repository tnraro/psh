import { User } from "@psh/db";
import { resolvers } from "@psh/schema";
import { StatusCodes } from "http-status-codes";
import { PshError } from "../errors";
import { mapUser } from "../mappers/User";

const resolver: resolvers.SessionResolvers = {
    async user(parent, _, context) {
        if (!parent.access_token) {
            throw PshError(StatusCodes.BAD_REQUEST);
        }
        const id = parent.access_token;

        const user = await User.getUserById(context.pool, id);

        if (!user) {
            throw PshError(StatusCodes.BAD_REQUEST);
        }
        return mapUser(user);
    }
};

export default resolver;
