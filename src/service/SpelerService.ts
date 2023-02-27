import {Request, Response} from "express";
import SpelerDAO from "../dao/SpelerDAO";
import validator from "validator";
import isUUID = validator.isUUID;
import * as joi from "joi";

class SpelerService {
    private readonly doa: SpelerDAO

    constructor() {
        this.doa = new SpelerDAO()
    }


    private async handleNonExistingSpeler(spelerUUID: string, res: Response){
        if (!isUUID(spelerUUID)) {
            return res.status(404).send()
        }

        if (!await this.doa.doesSpelerExist(spelerUUID)){
            return res.status(404).send()
        }

    }

    public getSpeler =  async (req: Request, res: Response) => {
        if(req.params.id === undefined){
            await this.getSpelers(req, res)
        } else{
            await this.getSingleSpeler(req, res)
        }
    }

    private getSingleSpeler =  async (req: Request, res: Response) => {
        try{
            const spelerUUID = String(req.params.id)
            await this.handleNonExistingSpeler(spelerUUID, res)
            const product = await this.doa.getSpeler(req.params.id)
            return res.status(200).send(product)
        }catch (e){
            return res.status(500).send()
        }
    }

    private getSpelers =  async (req: Request, res: Response) => {
        try{
            const spelers = await this.doa.getSpelers()
            return res.status(200).send(spelers)
        }catch (e){
            return res.status(500).send()
        }
    }

    private spelerSchema = joi.object({
        name: joi.string().min(2).required(),
        imageUrl: joi.string().min(5).required(),
        wins: joi.number().required(),
        loses: joi.number().required(),
        draws: joi.number().required()
    })

    public postSpeler =  async (req: Request, res: Response) => {
        const { error } = this.spelerSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        try {
            const product = await this.doa.createSpeler(req.body.name, req.body.draws, req.body.wins, req.body.loses)
            return res.status(200).send(product)
        } catch (error) {
            return res.status(500).send()
        }
    }

    public putSpeler =  async (req: Request, res: Response) => {
        const { error } = this.spelerSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        try {
            const spelerUUID = String(req.params.id)
            await this.handleNonExistingSpeler(spelerUUID, res)
            const speler = await this.doa.updateSpeler(spelerUUID, req.body.name, req.body.draws, req.body.wins, req.body.loses)
            return res.status(200).send(speler)
        } catch (error) {
            return res.status(500).send()
        }
    }

    public deleteSpeler =  async (req: Request, res: Response) => {
        const { error } = this.spelerSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        try {
            const spelerUUID = String(req.params.id)
            await this.handleNonExistingSpeler(spelerUUID, res)
            const speler = await this.doa.deleteSpeler(spelerUUID)
            return res.status(200).send(speler)
        } catch (error) {
            return res.status(500).send()
        }
    }
}

export default SpelerService
