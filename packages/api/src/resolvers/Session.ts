import { getUserById } from "@psh/db/dist/User";
import { SessionResolvers } from "@psh/schema/dist/generated/resolvers";
import { StatusCodes } from "http-status-codes";
import { PshError } from "../errors";
import { mapUser } from "../mappers/User";

const resolvers: SessionResolvers = {
    async user(parent, _, context) {
        if (!parent.access_token) {
            throw PshError(StatusCodes.BAD_REQUEST);
        }
        const id = parent.access_token;

        const user = await getUserById(context.pool, id);
        
        if (!user) {
            throw PshError(StatusCodes.BAD_REQUEST);
        }
        return mapUser(user);
    },
};

export default resolvers;