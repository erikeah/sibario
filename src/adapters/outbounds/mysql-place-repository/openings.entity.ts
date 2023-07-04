import { HoursStrings } from 'src/core/models/opening-hours/hours.enum';
import {
    Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import type { PlaceEntity } from './place.entity';

@Entity()
export class OpeningsEntity {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column()
        day: string;

    @ManyToOne('PlaceEntity', 'openings')
        place: PlaceEntity;

    @Column()
        open: HoursStrings;

    @Column()
        close: HoursStrings;

    constructor(object: OpeningsEntity) {
        Object.assign(this, object);
    }
}
