import {Repository} from "typeorm";
import {AppDataSource} from "../data-source";
import {Wedstrijd} from "../entity/Wedstrijd";
import {ZaalSessie} from "../entity/ZaalSessie";
import {Team} from "../entity/Team";
import {Goal} from "../entity/Goal";

class WedstrijdDAO {
    private wedstrijdRepository: Repository<Wedstrijd>

    constructor() {
        this.wedstrijdRepository = AppDataSource.getRepository(Wedstrijd)
    }

    public async doesWedstrijdExist(UUID: string): Promise<Boolean> {
        const wedstrijd = await this.wedstrijdRepository.findOne({where: {UUID: UUID}})
        return wedstrijd !== null
    }

    public async getWedstrijd(UUID: string): Promise<Wedstrijd> {
        const wedstrijd = await this.wedstrijdRepository.find({
                relations: {
                    ThuisClub: true,
                    UitClub: true
                },
                where: {
                    UUID: UUID}
            }
        )
        return wedstrijd[0]
    }

    public async getWedstrijden(): Promise<Wedstrijd[]> {
        const wedstrijd = await this.wedstrijdRepository.find({
            relations: {
                ThuisClub: true,
                UitClub: true
            }
        });
        return wedstrijd;
    }

    public async createWedstrijd(uitclub: Team, thuisClub: Team, thuisGoals: Goal[], uitGoals: Goal[]): Promise<Wedstrijd> {
        const wedstrijd = new Wedstrijd();
        wedstrijd.UitClub = uitclub;
        wedstrijd.ThuisClub = thuisClub;
        wedstrijd.ThuisGoals = thuisGoals;
        wedstrijd.UitGoals = uitGoals;
        return await this.wedstrijdRepository.save(wedstrijd)
    }

    public async updateWedstrijd(wedstrijdUUID: string, uitclub: Team, thuisClub: Team, thuisGoals: Goal[], uitGoals: Goal[]): Promise<Wedstrijd> {
        const wedstrijd = await this.wedstrijdRepository.findOne({where: {UUID: wedstrijdUUID}})
        wedstrijd.UitClub = uitclub;
        wedstrijd.ThuisClub = thuisClub;
        wedstrijd.ThuisGoals = thuisGoals;
        wedstrijd.UitGoals = uitGoals;
        return await this.wedstrijdRepository.save(wedstrijd)
    }

    public async deleteWedstrijd(wedstrijdenUUID: string): Promise<void> {
        await this.wedstrijdRepository.delete(wedstrijdenUUID)
    }
}

export default WedstrijdDAO
