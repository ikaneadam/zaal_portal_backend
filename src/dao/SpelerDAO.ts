import {Repository} from "typeorm";
import {AppDataSource} from "../data-source";
import {Speler} from "../entity/Speler";

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
            .leftJoin('Speler.Teams', 'teams')
            .leftJoin('Speler.goals', 'goals')
            .addSelect('Count(goals.UUID)', 'goals')
            .addSelect('COALESCE(SUM(teams.Wins),0)', 'wins')
            .addSelect('COALESCE(SUM(teams.loses),0)', 'loses')
            .addSelect('COALESCE(SUM(teams.Draws),0)', 'draws')
            .groupBy('Speler.UUID')
            .where('Speler.UUID = :id', { id: UUID })
            .getRawOne();
        return speler
    }

    public async getSpelers(): Promise<Speler[]> {
        const spelers = await this.spelerRepository
            .createQueryBuilder('Speler')
            .leftJoin('Speler.Teams', 'teams')
            .leftJoin('Speler.goals', 'goals')
            .addSelect('Count(goals.UUID)', 'goals')
            .addSelect('COALESCE(SUM(teams.Wins),0)', 'wins')
            .addSelect('COALESCE(SUM(teams.loses),0)', 'loses')
            .addSelect('COALESCE(SUM(teams.Draws),0)', 'draws')
            .groupBy('Speler.UUID')
            .getRawMany();
        return spelers
    }

    public async createSpeler(naam: string, imageUrl: string): Promise<Speler> {
        const speler = new Speler();
        speler.Naam = naam
        speler.ImageUrl = imageUrl
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
