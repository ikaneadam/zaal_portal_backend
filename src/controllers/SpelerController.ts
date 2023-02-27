import * as express from 'express'
import SpelerService from "../service/SpelerService";


class SpelerController {
    public path = '/api/speler/:id?'
    public router = express.Router()
    private service = new SpelerService()

    constructor() {
        this.routes()
    }

    public routes(){
        this.router.get(this.path, this.service.getSpeler)
        this.router.get(this.path, this.service.postSpeler)
        this.router.get(this.path, this.service.putSpeler)
        this.router.get(this.path, this.service.deleteSpeler)
    }
}


export default SpelerController
