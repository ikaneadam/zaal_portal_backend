import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Team} from "./Team";
import {Goal} from "./Goal";
import {ZaalSessie} from "./ZaalSessie";

@Entity()
export class Wedstrijd {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @ManyToOne(() => ZaalSessie, ZaalSessie => ZaalSessie.wedstrijden)
    zaalSessie: ZaalSessie

    @OneToOne(() => Team, {cascade: true})
    @JoinColumn()
    thuisClub: Team

    @OneToOne(() => Team, {cascade: true})
    @JoinColumn()
    uitClub: Team

    @OneToMany(() => Goal, (goal) => goal.thuiSwedstrijd, {cascade: ["insert"], eager: true})
    thuisGoals: Goal[]

    @OneToMany(() => Goal, (goal) => goal.uiTwedstrijd, {cascade: ["insert"], eager: true})
    uitGoals: Goal[]
}
