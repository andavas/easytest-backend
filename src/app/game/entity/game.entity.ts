import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'games'})
export class GameEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userID: string;

    @Column()
    score: number;

    @Column({ name: 'time_elapsed'})
    timeElapsed: string;

    @Column()
    reloads: number;

    @Column({ name: 'times_played'})
    timesPlayed: number;

}