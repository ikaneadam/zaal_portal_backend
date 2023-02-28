import {Request, Response} from "express";
import validator from "validator";
import isUUID = validator.isUUID;
import * as joi from "joi";
import ZaalSessieDAO from "../dao/ZaalSessieDAO";
import TeamDAO from "../dao/TeamDAO";

class TeamService {
    private readonly zaalSessieDAO: ZaalSessieDAO
    private readonly teamDAO: TeamDAO

    constructor() {
        this.zaalSessieDAO = new ZaalSessieDAO()
        this.teamDAO = new TeamDAO()
    }

    private async handleNonExistingZaalSessie(zaalSessieUUID: string, res: Response){
        if (!isUUID(zaalSessieUUID)) {
            return res.status(404).send()
        }

        if (!await this.zaalSessieDAO.doesZaalSessieExist(zaalSessieUUID)){
            return res.status(404).send()
        }
    }

    private async handleNonExistingTeam(teamUUID: string, res: Response){
        if (!isUUID(teamUUID)) {
            return res.status(404).send()
        }

        if (!await this.teamDAO.doesTeamExist(teamUUID)){
            return res.status(404).send()
        }
    }


}

export default TeamService
