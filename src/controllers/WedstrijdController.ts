import * as express from 'express'
import WedstrijdService from "../service/WedstrijdService";

class WedstrijdController {
    public path = '/api/zaalsessies/:zaalSessieId?/wedstrijden/:wedstrijdId?'
    public router = express.Router()
    private service = new WedstrijdService()

    constructor() {
        this.routes()
    }

    public routes(){
        this.router.get(this.path, this.service.getWedstrijd)
        this.router.post(this.path, this.service.postWedstrijd)
        this.router.post('/api/wedstrijden/:wedstrijdId?/goal', this.service.postAddGoalToWedstrijd)
        this.router.post('/api/wedstrijden/:wedstrijdId?/beeindig', this.service.postBeeindigWedstrijd)
        this.router.delete(this.path, this.service.deleteWedstrijd)
    }
}


export default WedstrijdController
