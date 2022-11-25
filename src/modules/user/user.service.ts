import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { defer, Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {}

    create(createUserDto: CreateUserDto): Observable<UserEntity> {
        return defer(() => this.usersRepository.save(createUserDto));
    }

    findAll(): Observable<UserEntity[]> {
        return defer(() => this.usersRepository.find());
    }

    findOne(id: number): Observable<UserEntity> {
        return defer(() => this.usersRepository.findOneBy({id}));
    }

    update(id: number, updateUserDto: UpdateUserDto): Observable<UpdateResult> {
        return defer(() => this.usersRepository.update(id, updateUserDto));
    }

    remove(id: number): Observable<DeleteResult> {
        return defer(() => this.usersRepository.delete({id}));
    }
}
