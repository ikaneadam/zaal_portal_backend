import { DataSource } from "typeorm"
import dotenv from "dotenv";

import { Admin } from "./entity/Admin";
import { Speler } from "./entity/Speler";
import { Team } from "./entity/Team";
import { Wedstrijd } from "./entity/Wedstrijd";
import { ZaalSessie } from "./entity/ZaalSessie";
import {Goal} from "./entity/Goal";

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
    entities: [Admin, Speler, Team, Wedstrijd, ZaalSessie, Goal]
})


