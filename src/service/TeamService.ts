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
            res.status(404).send()
            return
        }

        if (!await this.zaalSessieDAO.doesZaalSessieExist(zaalSessieUUID)){
            res.status(404).send()
            return
        }
    }

    private async handleNonExistingTeam(teamUUID: string, res: Response){
        if (!isUUID(teamUUID)) {
            res.status(404).send()
        }

        if (!await this.teamDAO.doesTeamExist(teamUUID)){
            res.status(404).send()
        }
    }

    public getTeam =  async (req: Request, res: Response) => {
        const zaalSessieUUID = req.params.zaalSessieId
        const teamUUID = req.params.teamId

        await this.handleNonExistingZaalSessie(zaalSessieUUID, res)

        if(teamUUID === undefined){
            await this.getTeams(zaalSessieUUID, req, res)
        } else{
            await this.getSingleTeam(teamUUID, req, res)
        }
    }

    private getSingleTeam =  async (teamUUID: string, req: Request, res: Response) => {
        try{
            // eigenlijk gaat het fout omdat hij nu in het algemeen kijkt naar een uuid en niet naar de combinatie van team en zaalsessie
            await this.handleNonExistingTeam(teamUUID, res)
            const team = await this.teamDAO.getTeam(teamUUID)
            return res.status(200).send(team)
        }catch (e){
            return res.status(500).send()
        }
    }

    private getTeams =  async (zaalSessieUUID: string, req: Request, res: Response) => {
        try{
            const teams = await this.teamDAO.getTeams(zaalSessieUUID)
            return res.status(200).send(teams)
        }catch (e){
            return res.status(500).send()
        }
    }

    private teamSchema = joi.object({
        Naam: joi.string().min(3).required()
    })

    public postTeam =  async (req: Request, res: Response) => {

    }

    public putTeam =  async (req: Request, res: Response) => {

    }

    public deleteTeam =  async (req: Request, res: Response) => {

    }

}

export default TeamService
