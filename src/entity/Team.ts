import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {ZaalSessie} from "./ZaalSessie";
import {Speler} from "./Speler";

@Entity()
export class Team {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @Column({ nullable: false})
    Naam: string

    @OneToMany(() => ZaalSessie, ZaalSessie => ZaalSessie.Teams)
    zaalSessie: ZaalSessie

    @ManyToMany(() => Speler,{ eager : true})
    @JoinTable()
    Spelers: Speler[];
}
