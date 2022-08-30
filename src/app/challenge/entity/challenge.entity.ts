import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'challenges'})
export class ChallengeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({type: "smallint", width: 1 })
    dificulty: number;

    @Column()
    score: number;

    @Column({ name: 'time_elapsed'})
    timeElapsed: string;

    @Column()
    reloads: number;

    @Column({ name: 'times_played'})
    timesPlayed: number;

    @Column()
    code: string;

    @Column()
    test: string;
}