import mysql from "serverless-mysql";

const db = mysql({
    config: {
        host: "localhost",
        user: "root",
        password: "root",
        database: "proyectofct",
        port: 3307,
    }
})

export default db