import { IsDefined, IsString } from 'class-validator';

export class PostPlaceBodyDto {
    @IsDefined()
    @IsString()
        name: string;
}
