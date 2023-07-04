import { IsOptional, ValidateNested } from 'class-validator';
import { OpeningHoursDto } from './opening-hours.dto';

export class OpeningDaysDto {
    @IsOptional()
    @ValidateNested({ each: true })
        monday: OpeningHoursDto[];

    @IsOptional()
    @ValidateNested({ each: true })
        tuesday: OpeningHoursDto[];

    @IsOptional()
    @ValidateNested({ each: true })
        wednesday: OpeningHoursDto[];

    @IsOptional()
    @ValidateNested({ each: true })
        thursday: OpeningHoursDto[];

    @IsOptional()
    @ValidateNested({ each: true })
        friday: OpeningHoursDto[];

    @IsOptional()
    @ValidateNested({ each: true })
        saturday: OpeningHoursDto[];

    @IsOptional()
    @ValidateNested({ each: true })
        sunday: OpeningHoursDto[];
}
