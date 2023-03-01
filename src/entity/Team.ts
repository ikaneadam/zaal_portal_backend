import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {ZaalSessie} from "./ZaalSessie";
import {Speler} from "./Speler";

@Entity()
export class Team {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @Column({ nullable: false})
    Naam: string

    @ManyToOne(() => ZaalSessie, ZaalSessie => ZaalSessie.Teams)
    zaalSessie: ZaalSessie

    @ManyToMany(() => Speler, (speler) => speler.Teams, {eager: true})
    @JoinTable()
    Spelers: Speler[];

    @Column({ nullable: true, default: 0})
    Wins: number = 0

    @Column({ nullable: true, default: 0})
    loses: number = 0

    @Column({ nullable: true, default: 0})
    Draws: number = 0
}
