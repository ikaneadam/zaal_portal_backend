import {Repository} from "typeorm";
import {AppDataSource} from "../data-source";
import {Speler} from "../entity/Speler";

class SpelerDAO {
    private spelerRepository: Repository<Speler>

    constructor() {
        this.spelerRepository = AppDataSource.getRepository(Speler)
    }

}

export default SpelerDAO
