import getPool from "@psh/db";
import { User } from "@psh/db";
import schema from "@psh/schema";
import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers";

const GRAPHQL = process.env.GRAPHQL;

if (!GRAPHQL) {
    throw new Error("No env");
}

const main = async () => {
    const pool = await getPool();

    const server = new ApolloServer({
        typeDefs: schema,
        resolvers,
        context: async ({ req }) => {
            const access_token = req.headers.authorization || "";

            let session = null;
            if (access_token) {
                const user = await User.getUserById(pool, access_token);
                if (user) {
                    if (user.tnid === access_token) {
                        session = {
                            access_token,
                            user
                        };
                    }
                }
            }
            return {
                pool,
                session
            };
        }
    });
    const { url } = await server.listen({ port: GRAPHQL });

    console.log(`🚀 Server ready at ${url}`);
};
main();
