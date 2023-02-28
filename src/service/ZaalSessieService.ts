import {Request, Response} from "express";
import validator from "validator";
import isUUID = validator.isUUID;
import * as joi from "joi";
import ZaalSessieDAO from "../dao/ZaalSessieDAO";

class ZaalSessieService {
    private readonly doa: ZaalSessieDAO

    constructor() {
        this.doa = new ZaalSessieDAO()
    }

    private async handleNonExistingZaalSessie(zaalSessieUUID: string, res: Response){
        if (!isUUID(zaalSessieUUID)) {
            return res.status(404).send()
        }

        if (!await this.doa.doesZaalSessieExist(zaalSessieUUID)){
            return res.status(404).send()
        }

    }

    public getZaalSessie =  async (req: Request, res: Response) => {
        if(req.params.id === undefined){
            await this.getZaalSessies(req, res)
        } else{
            await this.getSingleZaalSessie(req, res)
        }
    }

    private getSingleZaalSessie =  async (req: Request, res: Response) => {
        try{
            const zaalSessieUUID = String(req.params.id)
            await this.handleNonExistingZaalSessie(zaalSessieUUID, res)
            const product = await this.doa.getZaalSessie(req.params.id)
            return res.status(200).send(product)
        }catch (e) {
            return res.status(500).send()
        }
    }

    private getZaalSessies =  async (req: Request, res: Response) => {
        try{
            const zaalSessies = await this.doa.getZaalSessies()
            return res.status(200).send(zaalSessies)
        }catch (e){
            return res.status(500).send()
        }
    }

    private zaalSessieSchema = joi.object({
        Naam: joi.string().min(3).required()
    })

    public postZaalSessie =  async (req: Request, res: Response) => {
        const { error } = this.zaalSessieSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        try {
            const zaalSessie = await this.doa.createZaalSessie(req.body.Naam)
            return res.status(200).send(zaalSessie)
        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }
    }

    private zaalSessieUpdateSchema = joi.object({
        Naam: joi.string().min(3).required(),
        isklaar: joi.boolean().required()
    })

    public putZaalSessie =  async (req: Request, res: Response) => {
        const { error } = this.zaalSessieUpdateSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        try {
            const zaalSessieUUID = String(req.params.id)
            await this.handleNonExistingZaalSessie(zaalSessieUUID, res)
            const zaalSessie = await this.doa.updateZaalSessie(zaalSessieUUID, req.body.Naam, req.body.isklaar)
            return res.status(200).send(zaalSessie)
        } catch (error) {
            return res.status(500).send()
        }
    }

    public deleteZaalSessie =  async (req: Request, res: Response) => {
        try {
            const zaalSessieUUID = String(req.params.id)
            await this.handleNonExistingZaalSessie(zaalSessieUUID, res)
            await this.doa.deleteZaalSessie(zaalSessieUUID)
            return res.status(200).send()
        } catch (error) {
            return res.status(500).send()
        }
    }
}

export default ZaalSessieService
