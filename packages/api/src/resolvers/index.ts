import { IContext } from "./types";
import { Resolvers } from "@psh/schema/dist/generated/resolvers";
import Query from "./Query";
import Mutation from "./Mutation";
import User from "./User";
import Session from "./Session";

const resolvers: Resolvers<IContext> = {
    User,
    Session,
    Query,
    Mutation
};

export default resolvers;