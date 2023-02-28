import * as express from 'express'
import TeamService from "../service/TeamService";


class TeamController {
    public path = '/api/zaalsessies/:zaalSessieId?/teams/:teamId?'
    public router = express.Router()
    private service = new TeamService()

    constructor() {
        this.routes()
    }

    public routes(){
        this.router.get(this.path, this.service.getTeam)
        this.router.post(this.path, this.service.postTeam)
        this.router.put(this.path, this.service.putTeam)
        this.router.delete(this.path, this.service.deleteTeam)
    }
}


export default TeamController
