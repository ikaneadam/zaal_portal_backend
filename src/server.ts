import BackendApp from "./backendApp";
import cors from "cors";
import express from "express";

import dotenv from "dotenv";
import SpelerController from "./controllers/SpelerController";


dotenv.config();

const server = new BackendApp({
    port: Number(process.env.PORT) || 65036,
    middleWares: [
        cors(),
        express.json(),
        express.urlencoded({ extended: true })
    ],
    controllers: [
        new SpelerController(),
    ]
})

server.listen()
