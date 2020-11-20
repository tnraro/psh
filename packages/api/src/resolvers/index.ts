import { resolvers } from "@psh/schema";
import Device from "./Device";
import Home from "./Home";
import Mutation from "./Mutation";
import Query from "./Query";
import Session from "./Session";
import User from "./User";

const resolver: resolvers.Resolvers = {
    Device,
    Home,
    Session,
    User,
    Query,
    Mutation
};

export default resolver;
