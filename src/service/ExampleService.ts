import {Request, Response} from "express";
import ExampleDAO from "../dao/ExampleDAO";

class ExampleService {
    private readonly doa: ExampleDAO

    constructor() {
        this.doa = new ExampleDAO()
    }

    public ping =  async (req: Request, res: Response) => {
        try {
            return res.status(200).send({ping: "ping!"})
        } catch (error) {
            return res.status(500).send()
        }
    }
}

export default ExampleService
