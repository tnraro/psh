import { resolve } from "path";
import { readFileSync } from "fs";

const schema = readFileSync(resolve(__dirname, "../../generated/schema.graphql"), "utf8");

export default schema;