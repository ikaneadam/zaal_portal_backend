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
    name: string

    @OneToMany(() => Team, (team) => team.zaalSessie, {eager: true})
    teams: Team[];

    @OneToMany(() => Wedstrijd, (wedstrijd) => wedstrijd.zaalSessie)
    wedstrijden: Wedstrijd[];

    @Column({ nullable: false, default: true })
    isKlaar: Boolean = false;

    @CreateDateColumn()
    created_at: Date;
}
