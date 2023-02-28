import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {ZaalSessie} from "./ZaalSessie";
import {Team} from "./Team";
import {Wedstrijd} from "./Wedstrijd";
import {Goal} from "./Goal";

@Entity()
export class Speler {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @ManyToMany(() => Team, Team => Team.Spelers)
    Teams: Team[];

    @OneToMany(() => Goal, (goal) => goal.Scoorder, { eager : true })
    goals: Goal[];

    // @OneToMany(() => Goal, (goal) => goal.Assister, { eager : true })
    // assists: Goal[];

    @Column({ nullable: false, unique: true})
    Naam: string

    @Column({ nullable: true})
    ImageUrl: string
}
