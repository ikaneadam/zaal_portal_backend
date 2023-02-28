import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Team} from "./Team";
import {Goal} from "./Goal";

@Entity()
export class Speler {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @ManyToMany(() => Team, team => team.Spelers)
    Teams: Team[];

    @OneToMany(() => Goal, (goal) => goal.Scoorder, { eager : true })
    goals: Goal[];

    // @OneToMany(() => Goal, (goal) => goal.Assister, { eager : true })
    // assists: Goal[];

    @Column({ nullable: false, unique: true})
    Naam: string

    @Column({ nullable: true})
    ImageUrl: string
}
