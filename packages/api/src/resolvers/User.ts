import type { User, UserResolvers } from "@psh/schema/dist/generated/resolvers";
import { StatusCodes } from "http-status-codes";
import { PshError } from "../errors";
import { IContext } from "./types";

const resolver: UserResolvers<IContext> = {
    devices(parent, args, context) {
        throw PshError(StatusCodes.NOT_IMPLEMENTED);
        return [];
    },
    home(parent, args, context) {
        throw PshError(StatusCodes.NOT_IMPLEMENTED);
        return null;
    },
    roles(parent, args, context) {
        throw PshError(StatusCodes.NOT_IMPLEMENTED);
        return {
            admin: false
        }
    }
};
export default resolver;