import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
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


    @Column({ nullable: false, default: true})
    isKlaar: Boolean  = false;

    @Column({ nullable: true})
    eindTijd: Date

    @CreateDateColumn()
    created_at: Date;
}
