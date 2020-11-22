import { User, Home, Device } from "@psh/db";
import type { resolvers } from "@psh/schema";
import bcrypt, { compare } from "bcrypt";
import { StatusCodes } from "http-status-codes";
import tnid from "tnid";
import { PshError } from "../errors";
import { mapUser } from "../mappers/User";
import { mapHome } from "../mappers/Home";
import { mapDevice, mapDeviceType } from "../mappers/Device";
import { deleteDevice } from "@psh/db/dist/Device";

const resolver: resolvers.MutationResolvers = {
    async newUser(_, args, { pool }) {
        if (!(args.user.agelimit && args.user.usepolicy && args.user.privacy)) {
            throw PshError(StatusCodes.BAD_REQUEST);
        }

        const user: User.IDBUser = {
            tnid: tnid(4),
            email: args.user.email,
            username: args.user.username,
            terms: {
                agelimit: args.user.agelimit,
                usepolicy: args.user.usepolicy,
                privacy: args.user.privacy,
                promotion: args.user.promotion
            },
            hashedPassword: await bcrypt.hash(args.user.password, 10)
        };

        try {
            await User.newUser(pool, user);
        } catch (e: any) {
            if (e.code === "ER_DUP_ENTRY") {
                throw PshError(StatusCodes.CONFLICT);
            } else {
                console.error(e);
                throw PshError(StatusCodes.INTERNAL_SERVER_ERROR);
            }
        }

        return {
            access_token: user.tnid,
            user: mapUser(user)
        };
    },
    async signInUser(_, args, { pool }) {
        const user = await User.getUserByEmail(pool, args.user.email);

        if (!user) {
            throw PshError(StatusCodes.UNAUTHORIZED);
        }

        const match = await compare(args.user.password, user.hashedPassword);

        if (!match) {
            throw PshError(StatusCodes.UNAUTHORIZED);
        }

        // TODO: generate access_token

        return {
            access_token: user.tnid,
            user: mapUser(user)
        };
    },
    tnid() {
        return tnid(4);
    },
    async newHome(_, args, context) {
        if (!context.session) throw PshError(StatusCodes.UNAUTHORIZED);
        const id = tnid(4);
        const home: Home.IDBHome = {
            tnid: id,
            name: args.name
        };

        try {
            await Home.createHome(
                context.pool,
                home,
                context.session.user.tnid
            );
        } catch (e) {
            if (e === "NO_USER_CHANGED") {
                throw PshError(StatusCodes.UNAUTHORIZED);
            } else {
                throw PshError(StatusCodes.INTERNAL_SERVER_ERROR);
            }
        }

        return mapHome(home);
    },
    async joinHome(_, args, context) {
        if (!context.session) throw PshError(StatusCodes.UNAUTHORIZED);
        const home = await Home.getHomeById(context.pool, args.home);
        if (!home) throw PshError(StatusCodes.BAD_REQUEST);
        await Home.joinHome(context.pool, home.tnid, context.session.user.tnid);
        return mapHome(home);
    },
    async newDevice(_, args, context) {
        if (!context.session) throw PshError(StatusCodes.UNAUTHORIZED);
        if (!context.session.user.homeId)
            throw PshError(StatusCodes.BAD_REQUEST);
        if (!args.device.alias) throw PshError(StatusCodes.BAD_REQUEST);
        if (!args.device.id) throw PshError(StatusCodes.BAD_REQUEST);
        if (!args.device.type) throw PshError(StatusCodes.BAD_REQUEST);
        let type = null;
        try {
            type = await Device.getDeviceTypeById(
                context.pool,
                args.device.type
            );
        } catch (e) {
            console.error(e);
            throw PshError(StatusCodes.BAD_REQUEST);
        }
        if (!type) throw PshError(StatusCodes.BAD_REQUEST);
        const device: Device.IDBDevice = {
            tnid: args.device.id,
            typeId: args.device.type,
            alias: args.device.alias,
            homeId: context.session.user.homeId,
            ownerId: args.device.private
                ? context.session.user.tnid
                : undefined,
            status: type.defaultStatus
        };
        try {
            await Device.createDevice(context.pool, device);
        } catch (e) {
            console.error(e);
            throw PshError(StatusCodes.BAD_REQUEST);
        }
        return mapDevice(device);
    },
    async deleteDevice(_, args, context) {
        if (!context.session) throw PshError(StatusCodes.UNAUTHORIZED);

        const deviceId = args.id;
        const homeId = context.session.user.homeId;
        const ownerId = context.session.user.tnid;

        if (!deviceId || !homeId || !ownerId)
            throw PshError(StatusCodes.BAD_REQUEST);

        const device = await Device.getDeviceById(context.pool, deviceId);
        if (!device) throw PshError(StatusCodes.BAD_REQUEST);
        if (device.homeId !== homeId) throw PshError(StatusCodes.BAD_REQUEST);
        if (device.ownerId && device.ownerId !== ownerId)
            throw PshError(StatusCodes.BAD_REQUEST);

        try {
            await Device.deleteDevice(context.pool, deviceId);
        } catch (e) {
            console.error(e);
            throw PshError(StatusCodes.BAD_REQUEST);
        }
        return mapDevice(device);
    }
};

export default resolver;
