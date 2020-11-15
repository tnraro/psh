import { PshError } from "@psh/api/src/errors";
import { getDevicesByHome } from "@psh/db/dist/Device";
import { getFamily } from "@psh/db/dist/User";
import type { HomeResolvers } from "@psh/schema/dist/generated/resolvers";
import { StatusCodes } from "http-status-codes";
import { mapDevice } from "../mappers/Device";
import { mapUser } from "../mappers/User";

const resolver: HomeResolvers = {
    async family(parent, _, context) {
        const family = await getFamily(context.pool, parent.id);
        return family.map(mapUser);
    },
    async admins(parent, _, context) {
        throw PshError(StatusCodes.NOT_IMPLEMENTED);
        return [];
    },
    async devices(parent, _, context) {
        const devices = await getDevicesByHome(context.pool, parent.id);

        return devices.map(mapDevice);
    }
};
export default resolver;