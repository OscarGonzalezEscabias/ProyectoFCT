import mysql from "serverless-mysql";

const db = mysql({
    config: {
        host: "localhost",
        user: "root",
        password: "root",
        database: "proyectofct",
        port: 3306,
    }
})

export default db