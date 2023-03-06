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
            // eigenlijk gaat is dit fout omdat hij nu in het algemeen kijkt naar een uuid en niet naar de combinatie van team en zaalsessie
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

    private speler = joi.object().keys({
        uuid: joi.string(),
        imageurl: joi.string(),
        UUID: joi.string().guid().required(),
        name: joi.string().min(5).required(),
        goals: joi.string(),
        loses: joi.string(),
        draws: joi.string(),
        wins: joi.string(),
    })

    private teamSchema = joi.object({
        name: joi.string().min(3).required(),
        spelers: joi.array().items(this.speler).required()
    })

    public postTeam =  async (req: Request, res: Response) => {
        const zaalSessieUUID = req.params.zaalSessieId
        await this.handleNonExistingZaalSessie(zaalSessieUUID, res)

        const { error } = this.teamSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        try{
            const teams = await this.teamDAO.createTeam(zaalSessieUUID, req.body.name, req.body.spelers)
            return res.status(200).send(teams)
        }catch (e){
            return res.status(500).send()
        }
    }

    private teamUpdateSchema = joi.object({
        name: joi.string().min(3).required(),
        spelers: joi.array().items(this.speler).required(),
        wins: joi.number().greater(0).required(),
        loses: joi.number().greater(0).required(),
        draws: joi.number().greater(0).required(),
    })

    public putTeam =  async (req: Request, res: Response) => {
        const teamUUID = req.params.teamId
        await this.handleNonExistingTeam(teamUUID, res)

        const { error } = this.teamUpdateSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        try{
            const teams = await this.teamDAO.updateTeam(teamUUID, req.body.loses, req.body.draws, req.body.wins, req.body.name, req.body.spelers)
            return res.status(200).send(teams)
        }catch (e){
            return res.status(500).send()
        }
    }

    public deleteTeam =  async (req: Request, res: Response) => {
        try {
            const teamUUID = req.params.teamId
            await this.handleNonExistingTeam(teamUUID, res)
            await this.teamDAO.deleteTeam(teamUUID)
            return res.status(200).send()
        } catch (error) {
            return res.status(500).send()
        }
    }

}

export default TeamService
