import {Column, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, Repository} from "typeorm";
import {AppDataSource} from "../data-source";
import {Team} from "../entity/Team";
import {Speler} from "../entity/Speler";
import {ZaalSessie} from "../entity/ZaalSessie";

class TeamDAO {
    private teamRepository: Repository<Team>
    private zaalSessieRepository: Repository<ZaalSessie>

    constructor() {
        this.teamRepository = AppDataSource.getRepository(Team)
        this.zaalSessieRepository = AppDataSource.getRepository(ZaalSessie)
    }

    public async doesTeamExist(UUID: string): Promise<Boolean> {
        const team = await this.teamRepository.findOne({where: {UUID: UUID}})
        return team !== null
    }

    public async getTeam(UUID: string): Promise<Team> {
        const team = await this.teamRepository.find({
                relations: {
                    Spelers: true
                },
                where: {
                    UUID: UUID}
            }
        )
        return team[0]
    }

    public async getTeams(): Promise<Team[]> {
        const team = await this.teamRepository.find({
            relations: {
                Spelers: true
            }
        });
        return team;
    }

    public async createTeam(zaalSessieUUID: string, name: string, spelers: Speler[]): Promise<Team> {
        const zaalSessie = await this.zaalSessieRepository.findOne( {where: {UUID: zaalSessieUUID }} )
        const team = new Team();
        team.zaalSessie = zaalSessie
        team.Naam = name
        team.Spelers = spelers
        return await this.teamRepository.save(team)
    }

    public async updateTeam(teamUUID: string, goals: number, loses: number, draws: number, naam: string): Promise<Team> {
        const team = await this.teamRepository.findOne({where: {UUID: teamUUID }})
        team.Naam = naam
        return await this.teamRepository.save(team)
    }

    public async deleteTeam(teamUUID: string): Promise<void> {
        await this.teamRepository.delete(teamUUID)
    }
}

export default TeamDAO
