import { PshError } from "../errors";
import { Device } from "@psh/db";
import { User } from "@psh/db";
import type { resolvers } from "@psh/schema";
import { StatusCodes } from "http-status-codes";
import { mapDevice } from "../mappers/Device";
import { mapUser } from "../mappers/User";

const resolver: resolvers.HomeResolvers = {
    async family(parent, _, context) {
        const family = await User.getFamily(context.pool, parent.id);
        return family.map(mapUser);
    },
    async admins(parent, _, context) {
        throw PshError(StatusCodes.NOT_IMPLEMENTED);
        return [];
    },
    async devices(parent, _, context) {
        const devices = await Device.getDevicesByHome(context.pool, parent.id);

        return devices.map(mapDevice);
    }
};
export default resolver;