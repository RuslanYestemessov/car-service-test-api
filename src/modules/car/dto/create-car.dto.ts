import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCarDto {
    @ApiProperty()
    @IsNotEmpty()
    userId: number;

    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    brand: string;

    @ApiProperty()
    @IsNotEmpty()
    model: string;

    @ApiProperty()
    @IsNotEmpty()
    governmentNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    fuelCapability: number;
}
