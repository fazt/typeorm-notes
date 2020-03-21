import {config} from 'dotenv'
config();

import "reflect-metadata";
import app from "./app";
import { createConnection } from "typeorm";

async function main() {
  app.listen(app.get("port"));
  console.log("Server on port: ", app.get("port"));
  const connection = await createConnection({
    type: "mysql",
    host: process.env.NOTES_MYSQL_HOST || "localhost",
    port: 3306,
    username: process.env.NOTES_MYSQL_USER || "root",
    password: process.env.NOTES_MYSQL_PASSWORD || "",
    database: process.env.NOTES_MYSQL_DATABASE || "tssqlnotesapp",
    synchronize: true,
    logging: false,
    entities: ["./dist/entity/**/*.js"]
  });
  console.log("Database is Connected: ", connection.options.database);
}

main();
