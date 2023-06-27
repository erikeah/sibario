import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlaceEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;
}
