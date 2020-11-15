import getPool from "@psh/db";
import { getUserById } from "@psh/db/dist/User";
import schema from "@psh/schema";
import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers";

const main = async () => {
    const pool = await getPool();

    const server = new ApolloServer({
        typeDefs: schema,
        resolvers,
        context: async ({ req }) => {
            const access_token = req.headers.authorization || "";

            let session = null;
            if (access_token) {
                const user = await getUserById(pool, access_token);
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
    const { url } = await server.listen();

    console.log(`🚀 Server ready at ${url}`);
}
main();