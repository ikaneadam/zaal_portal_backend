import {Repository} from "typeorm";
import {AppDataSource} from "../data-source";
import {Speler} from "../entity/Speler";
import {Team} from "../entity/Team";

class SpelerDAO {
    private spelerRepository: Repository<Speler>

    constructor() {
        this.spelerRepository = AppDataSource.getRepository(Speler)
    }

    public async doesSpelerExist(UUID: string): Promise<Boolean> {
        const speler = await this.spelerRepository.findOne({where: {UUID: UUID}})
        return speler !== null
    }

    public async getSpeler(UUID: string): Promise<Speler> {
        const speler = await this.spelerRepository
            .createQueryBuilder('Speler')
            .leftJoinAndSelect('Speler.goals', 'goals')
            .leftJoinAndSelect('Speler.assists', 'assists')
            .loadRelationCountAndMap('Speler.goals', 'Speler.goals')
            .loadRelationCountAndMap('Speler.assists', 'Speler.assists')
            .where('user.UUID = :id', { id: UUID })
            .getOne();
        return speler
    }

    public async getSpelers(): Promise<Speler[]> {
        const spelers = await this.spelerRepository
            .createQueryBuilder('Speler')
            .leftJoinAndSelect('Speler.goals', 'goals')
            .loadRelationCountAndMap('Speler.goals', 'Speler.goals')
            .loadRelationCountAndMap('Speler.Teams.wins', '')
            .getMany();
        return spelers
    }

    public async createSpeler(naam: string): Promise<Speler> {
        const speler = new Speler();
        speler.Naam = naam
        return await this.spelerRepository.save(speler)
    }

    public async updateSpeler(spelerUUID: string, naam: string): Promise<Speler> {
        const speler = await this.spelerRepository.findOne({where: {UUID: spelerUUID}})
        speler.Naam = naam
        return await this.spelerRepository.save(speler)
    }

    public async deleteSpeler(spelerUUID: string): Promise<void> {
        await this.spelerRepository.delete(spelerUUID)
    }
}

export default SpelerDAO
