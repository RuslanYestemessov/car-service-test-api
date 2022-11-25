import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CarEntity } from './entities/car.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserService } from '../user/user.service';
import { defer, Observable, switchMap, take, tap } from 'rxjs';

@Injectable()
export class CarService {
    constructor(
        @InjectRepository(CarEntity)
        private readonly carsRepository: Repository<CarEntity>,
        private readonly userService: UserService
    ) {}

    create(createCarDto: CreateCarDto): Observable<CarEntity> {
        const {userId, ...dto} = createCarDto;
        return defer(() => this.userService.findOne(userId)).pipe(
            switchMap(value => {
                    console.log(value);
                    return this.carsRepository.save({
                        ...dto,
                        user: value
                    });
                }
            )
        );
    }

    findAll(): Observable<CarEntity[]> {
        return defer(() => this.carsRepository.find());
    }

    findOne(id: number): Observable<CarEntity> {
        return defer(() => this.carsRepository.findOneBy({id}));
    }

    update(id: number, updateCarDto: UpdateCarDto): Observable<UpdateResult> {
        return defer(() => this.carsRepository.update(id, updateCarDto));
    }

    remove(id: number): Observable<DeleteResult> {
        return defer(() => this.carsRepository.softDelete({id}));
    }
}
