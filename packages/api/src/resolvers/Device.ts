import { getHomeById } from "@psh/db/dist/Home";
import { getUserById } from "@psh/db/dist/User";
import type { DeviceResolvers } from "@psh/schema/dist/generated/resolvers";
import { mapHome } from "../mappers/Home";
import { mapUser } from "../mappers/User";

const resolver: DeviceResolvers = {
    async owner(parent, args, context) {
        const ownerId = parent.ownerId;
        if (!ownerId)
            return null;
        const user = await getUserById(context.pool, ownerId);
        
        return user ? mapUser(user) : null;
    },
    async home(parent, args, context) {
        const home = await getHomeById(context.pool, parent.homeId);
        
        return home ? mapHome(home) : null;
    }
};
export default resolver;