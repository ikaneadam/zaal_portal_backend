import {Request, Response} from "express";
import validator from "validator";
import isUUID = validator.isUUID;
import * as joi from "joi";
import ZaalSessieDAO from "../dao/ZaalSessieDAO";
import TeamDAO from "../dao/TeamDAO";
import WedstrijdDAO from "../dao/WedstrijdDAO";

class WedstrijdService {
    private readonly zaalSessieDAO: ZaalSessieDAO
    private readonly teamDAO: TeamDAO
    private readonly wedstrijdDAO: WedstrijdDAO

    constructor() {
        this.zaalSessieDAO = new ZaalSessieDAO()
        this.teamDAO = new TeamDAO()
        this.wedstrijdDAO = new WedstrijdDAO()
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
            return
        }

        if (!await this.teamDAO.doesTeamExist(teamUUID)){
            res.status(404).send()
            return
        }
    }

    private async handleNonExistingWedstrijd(wedstrijdUUID: string, res: Response){
        if (!isUUID(wedstrijdUUID)) {
            res.status(404).send()
            return
        }

        if (!await this.wedstrijdDAO.doesWedstrijdExist(wedstrijdUUID)){
            res.status(404).send()
            return
        }
    }

    public getWedstrijd =  async (req: Request, res: Response) => {
        const zaalSessieUUID = req.params.zaalSessieId
        const wedstrijdUUID = req.params.wedstrijdId

        await this.handleNonExistingZaalSessie(zaalSessieUUID, res)

        if(wedstrijdUUID === undefined){
            await this.getWedstrijden(zaalSessieUUID, req, res)
        } else{
            await this.getSingleWedstrijd(wedstrijdUUID, req, res)
        }
    }

    private getSingleWedstrijd =  async (wedstrijdUUID: string, req: Request, res: Response) => {
        try{
            // eigenlijk gaat is dit fout omdat hij nu in het algemeen kijkt naar een uuid en niet naar de combinatie van team en zaalsessie
            await this.handleNonExistingWedstrijd(wedstrijdUUID, res)
            const team = await this.wedstrijdDAO.getWedstrijd(wedstrijdUUID)
            return res.status(200).send(team)
        }catch (e){
            return res.status(500).send()
        }
    }

    private getWedstrijden =  async (zaalSessieUUID: string, req: Request, res: Response) => {
        try{
            const teams = await this.wedstrijdDAO.getWedstrijden(zaalSessieUUID)
            return res.status(200).send(teams)
        }catch (e){
            return res.status(500).send()
        }
    }

    private wedstrijdSchema = joi.object({
        ThuisClubUUID: joi.string().guid().required(),
        UitClubUUID: joi.string().guid().required(),
    })

    public postWedstrijd =  async (req: Request, res: Response) => {
        const zaalSessieUUID = req.params.zaalSessieId
        await this.handleNonExistingZaalSessie(zaalSessieUUID, res)

        const { error } = this.wedstrijdSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        await this.handleNonExistingTeam(req.body.ThuisClubUUID, res)
        await this.handleNonExistingTeam(req.body.UitClubUUID, res)
        try{
            const team = await this.wedstrijdDAO.createWedstrijd(req.body.ThuisClubUUID, req.body.UitClubUUID, zaalSessieUUID)
            return res.status(200).send(team)
        }catch (e){
            return res.status(500).send()
        }
    }

    // this.router.post(this.path + "/goal", this.service.postAddGoalToWedstrijd)
    private goal = joi.object({
        Scoorder: joi.string().guid().required(),
    })

    private addGoalSchema = joi.object({
        goalType: joi.string().valid('thuis','uit').required(),
        goal: this.goal.required()
    })



    public postAddGoalToWedstrijd =  async (req: Request, res: Response) => {
        const wedstrijdUUID = req.params.wedstrijdId
        await this.handleNonExistingWedstrijd(wedstrijdUUID, res)

        const { error } = this.addGoalSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        try{
            const team = await this.wedstrijdDAO.addGoalToWedstrijd(wedstrijdUUID, req.body.goalType, req.body.goal)
            return res.status(200).send(team)
        }catch (e){
            return res.status(500).send()
        }
    }

    public postBeeindigWedstrijd =  async (req: Request, res: Response) => {
        const wedstrijdUUID = req.params.wedstrijdId
        await this.handleNonExistingWedstrijd(wedstrijdUUID, res)

        try{
            const team = await this.wedstrijdDAO.beeindigWedstrijd(wedstrijdUUID)
            return res.status(200).send(team)
        }catch (e){
            return res.status(500).send()
        }
    }

    public deleteWedstrijd =  async (req: Request, res: Response) => {
        try {
            const wedstrijdUUID = req.params.wedstrijdId
            await this.handleNonExistingWedstrijd(wedstrijdUUID, res)
            await this.wedstrijdDAO.deleteWedstrijd(wedstrijdUUID)
            return res.status(200).send()
        } catch (error) {
            return res.status(500).send()
        }
    }
}

export default WedstrijdService
