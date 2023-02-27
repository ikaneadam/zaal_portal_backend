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
        const speler = await this.spelerRepository.findOne({
                relations: {
                    goals: true,
                    assists: true
                },
                where: {
                    UUID: UUID
                }
            }
        )
        return speler
    }

    public async getSpelers(): Promise<Speler[]> {
        const spelers = await this.spelerRepository.find({
            relations: {
                goals: true,
                assists: true
            }
        });
        return spelers;
    }

    public async createSpeler(naam: string, draws: number, wins: number, loses: number): Promise<Speler> {
        const speler = new Speler();
        speler.Naam = naam
        speler.Draws = draws
        speler.Wins = wins
        speler.loses = loses
        return await this.spelerRepository.save(speler)
    }

    public async updateSpeler(spelerUUID: string, naam: string, draws: number, wins: number, loses: number): Promise<Speler> {
        const speler = await this.spelerRepository.findOne({where: {UUID: spelerUUID}})
        speler.Naam = naam
        speler.Draws = draws
        speler.Wins = wins
        speler.loses = loses
        return await this.spelerRepository.save(speler)
    }

    public async deleteSpeler(spelerUUID: string): Promise<void> {
        await this.spelerRepository.delete(spelerUUID)
    }
}

export default SpelerDAO
