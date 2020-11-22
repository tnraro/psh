import { Device, User } from "@psh/db";
import type { resolvers } from "@psh/schema";
import { StatusCodes } from "http-status-codes";
import { PshError } from "../errors";
import { mapDeviceType } from "../mappers/Device";
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
    },
    async deviceTypes(_, args, context) {
        try {
            const deviceTypes = await Device.getDeviceTypes(context.pool);
            return deviceTypes.map(mapDeviceType);
        } catch (e) {
            console.log(e);
            throw PshError(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
};

export default resolver;
