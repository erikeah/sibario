import {
    IsDefined,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { OpeningDaysDto } from './opening-days.dto';

export class PostPlaceBodyDto {
    @IsDefined()
    @IsString()
        name: string;

    @IsOptional()
    @IsNumber()
        maxSeats?: number;

    @IsOptional()
    @ValidateNested()
        openingDays?: OpeningDaysDto;
}
