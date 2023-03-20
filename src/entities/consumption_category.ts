import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,OneToMany} from "typeorm";
import { ConsumptionEntity } from "./consumption";


@Entity({ name: "consumption_category" })
export class ConsumptionCategoryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100 })
    @IsString()
    consumption_name: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @OneToMany(()=>ConsumptionEntity,(consumption)=>consumption.consumption_category)
    consumption:ConsumptionEntity[]

}