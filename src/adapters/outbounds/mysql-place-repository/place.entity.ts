import {
    Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { OpeningsEntity } from './openings.entity';
import { PlaceEntityConstructor } from './interface';

@Entity()
export class PlaceEntity {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column()
        name: string;

    @Column({ nullable: true })
        maxSeats?: number;

    @OneToMany(
        'OpeningsEntity',
        'place',
        { cascade: true, nullable: true },
    )
        openings?: OpeningsEntity[];

    constructor(object: PlaceEntityConstructor) {
        Object.assign(this, object);
        if (object && object.openingDays) {
            this.openings = [];
            const days = Object.keys(object.openingDays);
            for (let i = 0; i < days.length; i++) {
                this.openings.push(...object.openingDays[days[i]].map(
                    (opening: OpeningsEntity) => (new OpeningsEntity({
                        id: opening.id,
                        day: days[i],
                        open: opening.open,
                        close: opening.close,
                        place: opening.place,
                    })),
                ));
            }
        }
    }
}
