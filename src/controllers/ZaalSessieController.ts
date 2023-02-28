import * as express from 'express'
import ZaalSessieService from "../service/ZaalSessieService";


class ZaalSessieController {
    public path = '/api/zaalsessies/:id?'
    public router = express.Router()
    private service = new ZaalSessieService()

    constructor() {
        this.routes()
    }

    public routes(){
        this.router.get(this.path, this.service.getZaalSessie)
        this.router.post(this.path, this.service.postZaalSessie)
        this.router.put(this.path, this.service.putZaalSessie)
        this.router.delete(this.path, this.service.deleteZaalSessie)
    }
}


export default ZaalSessieController
