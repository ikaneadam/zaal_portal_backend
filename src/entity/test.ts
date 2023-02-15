import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Test {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @Column({ nullable: false})
    notification: string
}
