import * as express from 'express'
import ExampleService from "../service/ExampleService";


class ExampleController {
    public path = '/api/ping/:id?'
    public router = express.Router()
    private service = new ExampleService()

    constructor() {
        this.routes()
    }

    public routes(){
        this.router.get(this.path, this.service.ping)
    }
}


export default ExampleController
