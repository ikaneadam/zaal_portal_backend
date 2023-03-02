import {AppDataSource} from "./data-source";
import {Team} from "./entity/Team";
import {Speler} from "./entity/Speler";
import {Wedstrijd} from "./entity/Wedstrijd";
import {ZaalSessie} from "./entity/ZaalSessie";
import {Goal} from "./entity/Goal";

AppDataSource.initialize().then(async () => {await main()}).catch(error => console.log(error))
const spelerRepository = AppDataSource.getRepository(Speler)
const teamRepository = AppDataSource.getRepository(Team)
const wedstrijdRepository = AppDataSource.getRepository(Wedstrijd)
const zaalSessieRepository = AppDataSource.getRepository(ZaalSessie)
const goalRepository = AppDataSource.getRepository(Goal)

async function main() {

}
