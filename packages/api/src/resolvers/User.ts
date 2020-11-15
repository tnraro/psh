import { getDevicesByOwner } from "@psh/db/dist/Device";
import { getHomeById } from "@psh/db/dist/Home";
import type { UserResolvers } from "@psh/schema/dist/generated/resolvers";
import { StatusCodes } from "http-status-codes";
import { PshError } from "../errors";
import { mapDevice } from "../mappers/Device";
import { mapHome } from "../mappers/Home";

const resolver: UserResolvers = {
    async devices(parent, args, context) {
        const devices = await getDevicesByOwner(context.pool, parent.id);
        return devices.map(mapDevice);
    },
    async home(parent, args, context) {
        if (!parent.homeId)
            throw PshError(StatusCodes.FORBIDDEN);
        const home = await getHomeById(context.pool, parent.homeId);
        
        return home ? mapHome(home) : null;
    },
    roles(parent, args, context) {
        throw PshError(StatusCodes.NOT_IMPLEMENTED);
        return {
            admin: false
        }
    }
};
export default resolver;