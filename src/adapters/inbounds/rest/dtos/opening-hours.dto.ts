import { IsDefined, IsString } from 'class-validator';

export class OpeningHoursDto {
    @IsString()
    @IsDefined()
        open: string;

    @IsString()
    @IsDefined()
        close: string;
}
