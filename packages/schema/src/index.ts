import { resolve } from "path";
import { readFileSync } from "fs";

const schema = readFileSync(
    resolve(__dirname, "../res/schema.gen.graphql"),
    "utf8"
);

export * as operations from "./operations.gen";
export * as resolvers from "./resolvers.gen";
export * as mappers from "./mappers";

export default schema;
