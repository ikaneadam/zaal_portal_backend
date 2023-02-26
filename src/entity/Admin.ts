import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @Column({ nullable: false})
    Username: string;

    @Column({ nullable: false})
    Password: string;
}
