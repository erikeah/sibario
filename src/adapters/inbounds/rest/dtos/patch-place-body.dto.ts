import {
    IsNumber, IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { OpeningDaysDto } from './opening-days.dto';

export class PatchPlaceBodyDto {
    @IsOptional()
    @IsString()
        name: string;

    @IsOptional()
    @IsNumber()
        maxSeats?: number;

    @IsOptional()
    @ValidateNested()
        openingDays?: OpeningDaysDto;
}
