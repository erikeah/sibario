import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from 'src/core/models';
import { PlaceRepository } from 'src/core/ports/outbounds/place-repository';
import { EntityManager, Repository } from 'typeorm';
import {
    HandledError,
    HandledErrorEnum,
} from 'src/shared/global-exception-filter';
import { CreatePlaceOutboundPayload } from 'src/core/ports/outbounds/place-repository/interface';
import { PlaceEntity } from './place.entity';

@Injectable()
export class MysqlPlaceRepository implements Partial<PlaceRepository> {
    constructor(
        @InjectRepository(PlaceEntity)
        private repository: Repository<PlaceEntity>,
        private entityManager: EntityManager,
    ) {}

    async list(): Promise<Place[]> {
        const places = await this.repository.find();
        if (!places) {
            throw new HandledError(
                'unable to list places',
                HandledErrorEnum.UnknowRepositoryError,
            );
        }
        return places.map((place) => this.transform(place));
    }

    async create(payload: CreatePlaceOutboundPayload): Promise<Place> {
        const { id } = await this.entityManager.save(new PlaceEntity(payload));
        if (!id) {
            throw new HandledError(
                'unable to create new place',
                HandledErrorEnum.UnknowRepositoryError,
            );
        }
        const place = await this.repository.findOne(
            {
                where: { id },
                relations: { openings: true },
            },
        );
        if (!place) {
            throw new HandledError(
                'unable to find created place',
                HandledErrorEnum.UnknowRepositoryError,
            );
        }
        return this.transform(place);
    }

    async update(id: string, request: Place): Promise<Place> {
        const saved = await this.repository.findOne(
            {
                where: { id },
                relations: { openings: true },
            },
        );
        if (!saved) {
            throw new HandledError(
                'unable to find place to update, data has not changed',
                HandledErrorEnum.UnknowRepositoryError,
            );
        }
        const requestEntity = new PlaceEntity({ ...request, id: saved.id });
        const { id: updatedId } = await this.entityManager.save(requestEntity);
        if (!updatedId || updatedId !== saved.id) {
            throw new HandledError(
                'unable to update succesfully, maybe data corruption has occurred',
                HandledErrorEnum.UnknowRepositoryError,
            );
        }
        const updated = await this.repository.findOne(
            {
                where: { id: updatedId },
                relations: { openings: true },
            },
        );
        if (!updated) {
            throw new HandledError(
                'unable to find place after been updated',
                HandledErrorEnum.UnknowRepositoryError,
            );
        }
        return this.transform(updated);
    }

    async delete(id: string): Promise<void> {
        try {
            await this.repository.delete(id);
        } catch (error) {
            new Logger().error(error);
            throw new HandledError(
                'an unknow error ocurred while deleting',
                HandledErrorEnum.UnknowRepositoryError,
            );
        }
    }

    private transform(entity: PlaceEntity): Place {
        const { openings } = entity;
        if (!openings || openings.length === 0) {
            return new Place({ id: entity.id, name: entity.name });
        }
        const openingDays = {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
        };
        for (let i = 0; i < openings.length; i++) {
            openingDays[openings[i].day].push({
                open: openings[i].open,
                close: openings[i].close,
            });
        }
        return new Place({ id: entity.id, name: entity.name, openingDays });
    }
}
