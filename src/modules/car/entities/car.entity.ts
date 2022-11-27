import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CarEntity {
    @ApiProperty()
    id: number;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    brand: string;

    @ApiProperty()
    model: string;

    @ApiProperty()
    governmentNumber: string;

    @ApiProperty()
    fuelCapability: number;

    @ApiPropertyOptional()
    remainingFuel: number;

    coordinates: [string, string];
}
