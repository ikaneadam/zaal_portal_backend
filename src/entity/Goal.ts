import {CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Speler} from "./Speler";
import {ZaalSessie} from "./ZaalSessie";
import {Wedstrijd} from "./Wedstrijd";

@Entity()
export class Goal {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @ManyToOne(() => Speler, {eager: true})
    Scoorder: Speler

    // @ManyToOne(() => Speler)
    // Assister: Speler

    @ManyToOne(() => Wedstrijd, wedstrijd => wedstrijd.uitGoals)
    uiTwedstrijd: Wedstrijd

    @ManyToOne(() => Wedstrijd, wedstrijd => wedstrijd.thuisGoals)
    thuiSwedstrijd: Wedstrijd

    @CreateDateColumn()
    created_at: Date;
}
