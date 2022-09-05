import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'challenges'})
export class ChallengeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({type: "smallint", width: 1 })
    dificulty: number;

    @Column()
    code: string;

    @Column()
    test: string;

    @DeleteDateColumn()
    deletedAt?: Date;
}
