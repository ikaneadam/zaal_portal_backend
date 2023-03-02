import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Team} from "./Team";
import {Goal} from "./Goal";

@Entity()
export class Speler {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @ManyToMany(() => Team, team => team.spelers)
    teams: Team[];

    @OneToMany(() => Goal, (goal) => goal.scoorder)
    goals: Goal[];

    // @OneToMany(() => Goal, (goal) => goal.Assister, { eager : true })
    // assists: Goal[];

    @Column({ nullable: false, unique: true})
    name: string

    @Column({ nullable: true})
    imageUrl: string
}
