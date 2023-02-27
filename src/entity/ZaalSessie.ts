import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm'
import {Team} from "./Team";
import {Wedstrijd} from "./Wedstrijd";

@Entity()
export class ZaalSessie {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @Column({ nullable: false})
    Naam: string

    @OneToMany(() => Team, (team) => team.zaalSessie, { eager : true, cascade: ["insert"] })
    Teams: Team[];

    @OneToMany(() => Wedstrijd, (wedstrijd) => wedstrijd.zaalSessie , { eager : true, cascade: ["insert"] })
    Wedstrijden: Wedstrijd[];

    @Column({ nullable: false, default: true })
    isKlaar: Boolean  = false;

    @Column({ nullable: true })
    eindTijd: Date

    @CreateDateColumn()
    created_at: Date;
}
