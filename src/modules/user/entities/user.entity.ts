import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
    @ApiProperty()
    id: number;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;
}
