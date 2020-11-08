import { Resolver } from "./types";
import { IResponse } from "@psh/schema";

export interface IArgs {
    
}

const resolver: Resolver<IArgs, IResponse> = async (parent, args, context, info) => {
    try {
        throw new Error("501 Not Implemented");
    } catch (e: any) {
        return {
            code: "501",
            success: false,
            message: e.message
        };
    }

    return {
        code: "200",
        success: true,
        message: "Unreachable code"
    };
};

export default resolver;