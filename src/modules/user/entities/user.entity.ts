import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CarEntity } from '../../car/entities/car.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UserEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: string;

    @ApiProperty()
    @Column()
    username: string;

    @ApiProperty()
    @Column()
    firstName: string;

    @ApiProperty()
    @Column()
    lastName: string;

    @OneToMany(
        () => CarEntity,
        car => car.id
    )
    cars: CarEntity[];
}
