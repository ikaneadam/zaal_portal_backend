import {Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Speler} from "./Speler";
import {Team} from "./Team";
import {Wedstrijd} from "./Wedstrijd";

@Entity()
export class ZaalSessie {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @Column({ nullable: false})
    Naam: string

    @ManyToMany(() => Team,{ eager : true})
    @JoinTable()
    Teams: Team[];

    @ManyToMany(() => Wedstrijd,{ eager : true})
    @JoinTable()
    Wedstrijden: Wedstrijd[];
}
