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
            if(!isUUID(spelerUUID)){
                return res.status(404).send()
            }

            if (!await this.doa.doesSpelerExist(spelerUUID)){
                return res.status(404).send()
            }
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
        Naam: joi.string().min(5).required(),
        ImageUrl: joi.string().min(5).required(),
        Wins: joi.number().required(),
        loses: joi.number().required(),
        Draws: joi.number().required()
    })

    public postSpeler =  async (req: Request, res: Response) => {

    }
}

export default SpelerService
