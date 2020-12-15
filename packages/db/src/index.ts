import mysql from "mysql2/promise";

export * as Device from "./Device";
export * as Home from "./Home";
export * as User from "./User";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

if (!(DB_HOST && DB_USER && DB_PASSWORD && DB_NAME)) {
    throw new Error("No env");
}

function getPool() {
    const options = {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };
    const pool = mysql.createPool(options);

    return pool;
}

export default getPool;
