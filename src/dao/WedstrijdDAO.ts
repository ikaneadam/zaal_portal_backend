import {Repository} from "typeorm";
import {AppDataSource} from "../data-source";
import {Wedstrijd} from "../entity/Wedstrijd";
import {Team} from "../entity/Team";
import {Goal} from "../entity/Goal";
import TeamDAO from "./TeamDAO";
import teamDAO from "./TeamDAO";
import ZaalSessieDAO from "./ZaalSessieDAO";
import {ZaalSessie} from "../entity/ZaalSessie";

class WedstrijdDAO {
    private wedstrijdRepository: Repository<Wedstrijd>
    //lol mag niet eigelijk maar ben lui
    private teamRepository: Repository<Team>
    private teamDAO: TeamDAO
    private zaalSessieDAO: ZaalSessieDAO

    constructor() {
        this.wedstrijdRepository = AppDataSource.getRepository(Wedstrijd)
        this.teamDAO = new teamDAO()
        this.zaalSessieDAO = new ZaalSessieDAO
        this.teamRepository = AppDataSource.getRepository(Team)
    }

    public async doesWedstrijdExist(UUID: string): Promise<Boolean> {
        const wedstrijd = await this.wedstrijdRepository.findOne({where: {UUID: UUID}})
        return wedstrijd !== null
    }

    public async getWedstrijd(UUID: string): Promise<Wedstrijd> {
        const wedstrijd = await this.wedstrijdRepository.findOne({
                relations: {
                    thuisClub: true,
                    uitClub: true,
                    uitGoals: true,
                    thuisGoals: true,
                    zaalSessie: true
                },
                where: {
                    UUID: UUID}
            }
        )
        return wedstrijd
    }

    public async getWedstrijden(): Promise<Wedstrijd[]> {
        const wedstrijd = await this.wedstrijdRepository.find({
            relations: {
                thuisClub: true,
                uitClub: true,
                uitGoals: true,
                thuisGoals: true,
                zaalSessie: true
            }
        });
        return wedstrijd;
    }

    public async createWedstrijd(ThuisClubUUID: string, UitClubUUID: string, zaalSessieUUID: string): Promise<Wedstrijd> {
        const thuisClub: Team = await this.teamDAO.getTeam(ThuisClubUUID)
        const uitclub: Team = await this.teamDAO.getTeam(UitClubUUID)
        const zaalSessie: ZaalSessie = await this.zaalSessieDAO.getZaalSessie(zaalSessieUUID)

        const wedstrijd = new Wedstrijd();
        wedstrijd.uitClub = uitclub;
        wedstrijd.thuisClub = thuisClub;
        wedstrijd.zaalSessie = zaalSessie
        return await this.wedstrijdRepository.save(wedstrijd)
    }

    public async updateWedstrijd(wedstrijdUUID: string, uitclub: Team, thuisClub: Team, thuisGoals: Goal[], uitGoals: Goal[]): Promise<Wedstrijd> {
        const wedstrijd = await this.wedstrijdRepository.findOne({where: {UUID: wedstrijdUUID}})
        wedstrijd.uitClub = uitclub;
        wedstrijd.thuisClub = thuisClub;
        wedstrijd.thuisGoals = thuisGoals;
        wedstrijd.uitGoals = uitGoals;
        return await this.wedstrijdRepository.save(wedstrijd)
    }

    public async deleteWedstrijd(wedstrijdenUUID: string): Promise<void> {
        await this.wedstrijdRepository.delete(wedstrijdenUUID)
    }

    public isHomeGoal(goalType: "thuis" | "uit"){
        return goalType === "thuis"
    }

    public async addGoalToWedstrijd(wedstrijdUUID: string, goalType: "thuis" | "uit", goal: Goal): Promise<Wedstrijd> {
        const wedstrijd = await this.getWedstrijd(wedstrijdUUID)
        if (this.isHomeGoal(goalType)) {
            wedstrijd.thuisGoals = [].concat(wedstrijd.thuisGoals, goal);
        } else {
            wedstrijd.uitGoals = [].concat(wedstrijd.uitGoals, goal);
        }
        return await this.wedstrijdRepository.save(wedstrijd)
    }

    public async beeindigWedstrijd(wedstrijdUUID: string): Promise<Team[]> {
        const wedstrijd = await this.getWedstrijd(wedstrijdUUID)
        const homeGoals = wedstrijd.thuisGoals.length
        const awayGoals = wedstrijd.uitGoals.length
        return await this.updateTeamsStatsAfterGame(wedstrijd.thuisClub.UUID, wedstrijd.uitClub.UUID, homeGoals, awayGoals)
    }


    // todo deze horen een eigen klasse te hebben
    private async updateTeamsStatsAfterGame(homeTeamUUID: string, awayTeamUUID: string, homeGoals: number, awayGoals: number): Promise<Team[]> {
        const homeTeam: Team = await this.teamDAO.getTeam(homeTeamUUID)
        const awayTeam: Team  = await this.teamDAO.getTeam(awayTeamUUID)

        if (this.isDraw(homeGoals, awayGoals)) {
            homeTeam.draws += 1;
            awayTeam.draws += 1;
        }

        if (this.hasHomeTeamWon(homeGoals, awayGoals)) {
            homeTeam.wins += 1;
            awayTeam.loses += 1;
        }

        if (this.hasAwayTeamWon(homeGoals, awayGoals)) {
            homeTeam.loses += 1;
            awayTeam.wins += 1;
        }
        const updatedHomeTeam = await this.teamRepository.save(homeTeam)
        const updatedAwayTeam = await this.teamRepository.save(awayTeam)
        return [updatedHomeTeam, updatedAwayTeam]
    }

    private isDraw(homeGoals: number, awayGoals: number){
        return homeGoals === awayGoals
    }

    private hasHomeTeamWon(homeGoals: number, awayGoals: number){
        return homeGoals > awayGoals
    }

    private hasAwayTeamWon(homeGoals: number, awayGoals: number){
        return homeGoals < awayGoals
    }
}

export default WedstrijdDAO
