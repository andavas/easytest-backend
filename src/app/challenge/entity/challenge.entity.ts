import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'challenges'})
export class ChallengeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({type: "smallint", width: 1 }) // 0 easy, 1 medium, 2 hard
    dificulty: number;

    @Column({type: "smallint", width: 1, nullable: true }) // 0 code and test, 1 code only, 2 test only
    type: number;

    @Column()
    code: string;

    @Column()
    test: string;

    @DeleteDateColumn()
    deletedAt?: Date;
}
