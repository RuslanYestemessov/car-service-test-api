import { HttpException, HttpStatus, Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { CreateCarDto } from "../dto/create-car.dto";
import { UpdateCarDto } from "../dto/update-car.dto";
import { CarEntity } from "../entities/car.entity";
import { UserService } from "../../user/user.service";
import { Observable } from "rxjs";
import { PG_CONNECTION } from "../../../common/database/database.module";
import { CarInfoUpdateDto } from '../dto/car-info-update.dto';

@Injectable()
export class CarService implements OnModuleInit {
    constructor(
        @Inject(PG_CONNECTION)
        private readonly conn: any,
        private readonly userService: UserService
    ) {}

    async create(createCarDto: CreateCarDto) {
        const {userId} = createCarDto;
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const cars = await this.conn.query(`
                INSERT INTO cars ("userId", title, brand, model, "governmentNumber", "fuelCapability")
                VALUES ($1, $2, $3, $4, $5, $6)`,
            [
                createCarDto.userId,
                createCarDto.title,
                createCarDto.brand,
                createCarDto.model,
                createCarDto.governmentNumber,
                createCarDto.fuelCapability
            ]);
        return cars.rows;
    }

    findAll(): Promise<CarEntity[]> {
        return this.conn.query('SELECT * FROM cars');
    }

    findOne(id: number): Promise<CarEntity> {
        return this.conn.query(`SELECT *
                                FROM cars
                                WHERE id = ${ id }`);
    }

    update(id: number, updateCarDto: UpdateCarDto): Observable<any> {
        return this.conn.query(`
            UPDATE cars
            SET title=$1,
                brand=$2,
                model=$3,
                "governmentNumber"=$4,
                "fuelCapability"=$5
            WHERE id = ${ id }
        `, [
            updateCarDto.title,
            updateCarDto.brand,
            updateCarDto.model,
            updateCarDto.governmentNumber,
            updateCarDto.fuelCapability
        ]);
    }

    async infoUpdate(dto: CarInfoUpdateDto) {
        await this.conn.query(`
            UPDATE cars
            SET "remainingFuel"=$1,
                coordinates=$2
            WHERE id = ${ dto.id }
        `);
        return;
    }

    async remove(id: number) {
        await this.conn.query(`DELETE
                               FROM users
                               WHERE id = ${ id }`);
        return id;
    }

    onModuleInit(): any {
        const query = `
            CREATE TABLE IF NOT EXISTS "cars"
            (
                "id"               SERIAL,
                "userId"           int          NOT NULL,
                "createdAt"        timestamp DEFAULT CURRENT_TIMESTAMP,
                "title"            VARCHAR(255) NOT NULL,
                "brand"            VARCHAR(255) NOT NULL,
                "model"            VARCHAR(255) NOT NULL,
                "governmentNumber" VARCHAR(255) NOT NULL,
                "fuelCapability"   int          NOT NULL,
                "remainingFuel"    int,
                "coordinates"      jsonb,
                PRIMARY KEY ("id"),
                FOREIGN KEY ("userId") REFERENCES users (id) ON DELETE SET NULL
            );`;
        this.conn.query(query);
    }
}
