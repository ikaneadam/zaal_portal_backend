import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {ZaalSessie} from "./ZaalSessie";
import {Speler} from "./Speler";

@Entity()
export class Team {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @Column({ nullable: false})
    name: string

    @ManyToOne(() => ZaalSessie, ZaalSessie => ZaalSessie.teams)
    zaalSessie: ZaalSessie

    @ManyToMany(() => Speler, (speler) => speler.teams, {eager: true})
    @JoinTable()
    spelers: Speler[];

    @Column({ nullable: true, default: 0})
    wins: number = 0

    @Column({ nullable: true, default: 0})
    loses: number = 0

    @Column({ nullable: true, default: 0})
    draws: number = 0
}
