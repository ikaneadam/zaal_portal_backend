import {Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {ZaalSessie} from "./ZaalSessie";
import {Speler} from "./Speler";

@Entity()
export class Team {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @Column({ nullable: false})
    Naam: string

    @OneToOne(() => ZaalSessie)
    ZaalSessie: ZaalSessie

    @ManyToMany(() => Speler,{ eager : true})
    @JoinTable()
    Spelers: Speler[];

    @Column({ nullable: false})
    Wins: number

    @Column({ nullable: false})
    loses: number

    @Column({ nullable: false})
    Draws: number

    @Column({ nullable: false})
    Goals: number
}
