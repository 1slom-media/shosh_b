import { IsString} from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn, ManyToOne } from "typeorm";
import { OrdersEntity } from "./orders";


@Entity({ name: "users" })
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 200 })
    @IsString()
    name: string

    @Column({ type: "varchar", length: 200 })
    @IsString()
    surname: string

    @Column({ type: "varchar", length: 200 })
    @IsString()
    father_name: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    birthday: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    phone: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    seriya: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    number: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    adress: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    dateof: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    email: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(() => OrdersEntity, (orders) => orders.users)
    orders: OrdersEntity
}