import * as express from 'express'
import SpelerService from "../service/SpelerService";
import fileUpload from "../middleware/fileUpload";

class SpelerController {
    public path = '/api/spelers/:id?'
    public router = express.Router()
    private service = new SpelerService()

    constructor() {
        this.routes()
    }

    public routes(){
        this.router.get(this.path, this.service.getSpeler)
        this.router.post(this.path, fileUpload.single("picture"), this.service.postSpeler)
        this.router.put(this.path, this.service.putSpeler)
        this.router.delete(this.path, this.service.deleteSpeler)
    }
}


export default SpelerController
