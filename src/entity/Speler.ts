import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Speler {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @Column({ nullable: false})
    Naam: string

    @Column({ nullable: false})
    IamgeUrl: string

    @Column({ nullable: false})
    Goals: number

    @Column({ nullable: false})
    Assists: number

    @Column({ nullable: false})
    Wins: number

    @Column({ nullable: false})
    loses: number

    @Column({ nullable: false})
    Draws: number
}
