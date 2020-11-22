import { Device, Home } from "@psh/db";
import type { resolvers } from "@psh/schema";
import { StatusCodes } from "http-status-codes";
import { PshError } from "../errors";
import { mapDevice } from "../mappers/Device";
import { mapHome } from "../mappers/Home";

const resolver: resolvers.UserResolvers = {
    async devices(parent, args, context) {
        if (!parent.homeId) throw PshError(StatusCodes.BAD_REQUEST);
        try {
            const devices = await Device.getDevicesByHome(
                context.pool,
                parent.homeId
            );
            return devices
                .filter(
                    (device) => !device.ownerId || device.ownerId === parent.id
                )
                .map(mapDevice);
        } catch (e) {
            console.error(e);
            throw PshError(StatusCodes.BAD_REQUEST);
        }
    },
    async home(parent, args, context) {
        if (!parent.homeId) throw PshError(StatusCodes.FORBIDDEN);
        const home = await Home.getHomeById(context.pool, parent.homeId);

        return home ? mapHome(home) : null;
    },
    roles(parent, args, context) {
        throw PshError(StatusCodes.NOT_IMPLEMENTED);
        return {
            admin: false
        };
    }
};
export default resolver;
