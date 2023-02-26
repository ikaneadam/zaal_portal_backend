import {Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {ZaalSessie} from "./ZaalSessie";
import {Speler} from "./Speler";
import {Team} from "./Team";

@Entity()
export class Wedstrijd {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @OneToOne(() => Team)
    ThuisClub: Team

    @OneToOne(() => Team)
    UitClub: Team

    @Column({ nullable: false})
    ThuisScore: number

    @Column({ nullable: false})
    UitScore: number
}
