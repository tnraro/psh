import { ApolloServer, gql } from "apollo-server";
import resolvers from "./resolvers";
import { schema } from "@psh/schema";
import getPool from "@psh/db";

const main = async () => {
    const pool = await getPool();

    const server = new ApolloServer({
        typeDefs: schema,
        resolvers,
        context: {
            pool
        }
    });
    const { url } = await server.listen();

    console.log(`🚀 Server ready at ${url}`);
}
main();