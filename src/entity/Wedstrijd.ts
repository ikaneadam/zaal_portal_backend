import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Team} from "./Team";
import {Goal} from "./Goal";
import {ZaalSessie} from "./ZaalSessie";

@Entity()
export class Wedstrijd {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @ManyToOne(() => ZaalSessie, ZaalSessie => ZaalSessie.Wedstrijden)
    zaalSessie: ZaalSessie

    @OneToOne(() => Team, {cascade: true})
    @JoinColumn()
    ThuisClub: Team

    @OneToOne(() => Team, {cascade: true})
    @JoinColumn()
    UitClub: Team

    @OneToMany(() => Goal, (goal) => goal.thuiSwedstrijd, {cascade: ["insert"], eager: true})
    ThuisGoals: Goal[]

    @OneToMany(() => Goal, (goal) => goal.uiTwedstrijd, {cascade: ["insert"], eager: true})
    UitGoals: Goal[]
}
