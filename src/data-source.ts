import { DataSource } from "typeorm"
import dotenv from "dotenv";
import {Test} from "./entity/test";


dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: String(process.env.DB_HOST),
    username: String(process.env.POSTGRES_USERNAME),
    password: String(process.env.POSTGRES_PASSWORD),
    database: String(process.env.POSTGRES_DB),
    port: Number(process.env.POSTGRES_PORT),
    synchronize: true,
    logging: false,
    entities: [Test]
})

