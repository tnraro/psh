import { Resolvers } from "@psh/schema/dist/generated/resolvers";
import Device from "./Device";
import Home from "./Home";
import Mutation from "./Mutation";
import Query from "./Query";
import Session from "./Session";
import User from "./User";

const resolvers: Resolvers = {
    Device,
    Home,
    Session,
    User,
    Query,
    Mutation
};

export default resolvers;