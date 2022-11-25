import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class CarEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: string;

    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    brand: string;

    @ApiProperty()
    @Column()
    model: string;

    @ApiProperty()
    @Column()
    governmentNumber: string;

    @ApiProperty()
    @Column()
    fuelCapability: number;

    @ApiPropertyOptional()
    @Column({nullable: true})
    remainingFuel: number;

    @Index({spatial: true})
    @Column({
        type: 'point',
        srid: 4326,
        nullable: true,
        spatialFeatureType: 'Point'
    })
    coordinates: [string, string];

    @ManyToOne(
        () => UserEntity,
        user => user.cars
    )
    user: UserEntity;
}
