import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,ManyToOne} from "typeorm";
import { ConsumptionCategoryEntity } from "./consumption_category";

@Entity({ name: "consumption" })
export class ConsumptionEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100 })
    @IsString()
    amount: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    type_payment: string

    @Column({ type: "text"})
    @IsString()
    comentary: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(() => ConsumptionCategoryEntity, (consumption_category) => consumption_category.consumption)
    consumption_category: ConsumptionCategoryEntity
}
