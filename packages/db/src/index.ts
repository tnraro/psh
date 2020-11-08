import mysql from "mysql2/promise";
import { resolve } from "path";
import fs from "fs/promises";

async function loadConfig(): Promise<any> {
    const path = resolve(__dirname, "../.env/db-config.json");
    const data = await fs.readFile(path)
    return JSON.parse(data.toString());
}

async function getPool() {
    const config = await loadConfig();
    
    // Should be validate config file
    const options = {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };
    const pool = mysql.createPool(options);
    
    return pool;
}

export default getPool;