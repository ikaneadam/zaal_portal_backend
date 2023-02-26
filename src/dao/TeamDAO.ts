import {Column, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, Repository} from "typeorm";
import {AppDataSource} from "../data-source";
import {Team} from "../entity/Team";
import {Speler} from "../entity/Speler";

class TeamDAO {
    private teamRepository: Repository<Team>

    constructor() {
        this.teamRepository = AppDataSource.getRepository(Team)
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
//todo fix this add zaalsessie based on UUID OF THE ZAAL SESSIE
    public async createTeam(uitclub: Team, thuisClub: Team): Promise<Team> {
        const team = new Team();


        return await this.teamRepository.save(team)
    }

    public async updateTeam(teamUUID: string, uitclub: Team, thuisClub: Team, thuisScore: number, uitScore: number): Promise<Team> {
        const team = await this.teamRepository.findOne({where: {UUID: teamUUID}})

        return await this.teamRepository.save(team)
    }

    public async deleteteam(teamUUID: string): Promise<void> {
        await this.teamRepository.delete(teamUUID)
    }

}

export default TeamDAO
