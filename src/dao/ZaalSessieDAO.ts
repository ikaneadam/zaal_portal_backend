import {Repository} from "typeorm";
import {AppDataSource} from "../data-source";
import {ZaalSessie} from "../entity/ZaalSessie";
import {Team} from "../entity/Team";
import {Wedstrijd} from "../entity/Wedstrijd";

class ZaalSessieDAO {
    private zaalSessieRepository: Repository<ZaalSessie>

    constructor() {
        this.zaalSessieRepository = AppDataSource.getRepository(ZaalSessie)
    }

    public async doesZaalSessieExist(UUID: string): Promise<Boolean> {
        const zaalSessie = await this.zaalSessieRepository.findOne({where: {UUID: UUID}})
        return zaalSessie !== null
    }

    public async getZaalSessie(UUID: string): Promise<ZaalSessie> {
        const zaalSessie = await this.zaalSessieRepository.find({
                relations: {
                    Wedstrijden: true,
                    Teams: true,
                },
                where: {
                    UUID: UUID}
            }
        )
        return zaalSessie[0]
    }

    public async getZaalSessies(): Promise<ZaalSessie[]> {
        const zaalSessies = await this.zaalSessieRepository.find({
            relations: {
                Wedstrijden: true,
                Teams: true,
            }
        });
        return zaalSessies;
    }

    public async createZaalSessie(teams: Team[], wedstrijden: Wedstrijd[], naam: string): Promise<ZaalSessie> {
        const zaalSessie = new ZaalSessie();
        zaalSessie.Teams = teams;
        zaalSessie.Wedstrijden = wedstrijden;
        zaalSessie.Naam = naam;
        return await this.zaalSessieRepository.save(zaalSessie)
    }

    public async updateZaalSessie(zaalSessieUUID: string, teams: Team[], wedstrijden: Wedstrijd[], naam: string, eindTijd: Date, isklaar: boolean): Promise<ZaalSessie> {
        const zaalSessie = await this.zaalSessieRepository.findOne({where: {UUID: zaalSessieUUID}})
        zaalSessie.Teams = teams;
        zaalSessie.Wedstrijden = wedstrijden;
        zaalSessie.Naam = naam;
        zaalSessie.eindTijd = eindTijd;
        zaalSessie.isKlaar = isklaar;
        return await this.zaalSessieRepository.save(zaalSessie)
    }

    public async deleteZaalSessie(zaalSessieUUID: string): Promise<void> {
        await this.zaalSessieRepository.delete(zaalSessieUUID)
    }
}

export default ZaalSessieDAO
