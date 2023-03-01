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

    public async getTeams(zaalSessieUUID: string): Promise<Team[]> {
        const team = await this.teamRepository.find({
            relations: {
                Spelers: true
            },
            where: { zaalSessie: {
                UUID: zaalSessieUUID
                }
            }
        });
        return team;
    }

    public async createTeam(zaalSessieUUID: string, name: string, spelers: Speler[]): Promise<Team | never> {
        try{
            const zaalSessie = await this.zaalSessieRepository.findOne( {where: {UUID: zaalSessieUUID }} )
            const team = new Team();
            team.zaalSessie = zaalSessie
            team.Naam = name
            team.Spelers = spelers
            return await this.teamRepository.save(team)
        }catch (e){
            throw new Error();
        }
    }

    public async updateTeam(teamUUID: string, loses: number, draws: number, wins: number, naam: string, spelers: Speler[]): Promise<Team> {
        const team = await this.teamRepository.findOne({where: {UUID: teamUUID }})
        team.Naam = naam
        team.Spelers = spelers
        team.loses = loses
        team.Wins = wins
        team.Draws = draws
        return await this.teamRepository.save(team)
    }

    public async deleteTeam(teamUUID: string): Promise<void> {
        await this.teamRepository.delete(teamUUID)
    }
}

export default TeamDAO
