import { Device, Home, User } from "@psh/db";
import type { resolvers } from "@psh/schema";
import { type } from "os";
import { mapDeviceType } from "../mappers/Device";
import { mapHome } from "../mappers/Home";
import { mapUser } from "../mappers/User";

const resolver: resolvers.DeviceResolvers = {
    async owner(parent, args, context) {
        const ownerId = parent.ownerId;
        if (!ownerId) return null;
        const user = await User.getUserById(context.pool, ownerId);

        return user ? mapUser(user) : null;
    },
    async home(parent, args, context) {
        const home = await Home.getHomeById(context.pool, parent.homeId);

        return home ? mapHome(home) : null;
    },
    async type(parent, args, context) {
        const type = await Device.getDeviceTypeById(
            context.pool,
            parent.typeId
        );
        return type ? mapDeviceType(type) : null;
    }
};
export default resolver;
