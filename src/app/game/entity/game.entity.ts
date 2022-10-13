import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'games'})
export class GameEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userID: string;

    @Column()
    challengeID: string;

    @Column({default: 0})
    score: number;

    @Column({default: 0})
    reloads: number;

    @CreateDateColumn({ name: 'created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @Column({ name: 'finshed_at', type: 'timestamptz', nullable:true })
    finshedAt?: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}