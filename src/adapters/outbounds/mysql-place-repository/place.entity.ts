import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlaceEntity {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column()
        name: string;
}
