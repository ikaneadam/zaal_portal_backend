import express from "express";
import {Express} from 'express-serve-static-core';
import { AppDataSource } from "./data-source"
import * as path from "path";

class BackendApp {
    public app: Express
    public port: number
    constructor(appInit: { port: any; controllers: any; middleWares: any;}) {
        this.app = express()
        this.port = appInit.port
        this.staticFiles()
        this.middlewares(appInit.middleWares)
        this.routes(appInit.controllers)

        AppDataSource.initialize().then(async () => {}).catch(error => console.log(error))
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        });

        this.app.use((req, res, next) => {
            res.status(404).send('<h1> Page not found </h1>');
        });
    }

    private staticFiles() {
        this.app.use('/static', express.static(path.join(__dirname, '../fileStorage')))
    }

    public listen() {
        const server = this.app.listen(this.port,"0.0.0.0")
        console.log(`Server listening on http://localhost:${this.port}`)
        return server
    }
}

export default BackendApp
