import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn, OneToMany } from "typeorm";
import { RoomsEntity } from "./rooms";
import { ServicesEntity } from "./services";
import { StaffEntity } from "./staff";


@Entity({ name: "filials" })
export class FilialEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100 })
    @IsString()
    filial_name: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @OneToMany(() => StaffEntity, (staff) => staff.filial)
    staff: StaffEntity[]

    @OneToMany(()=>RoomsEntity,(rooms)=>rooms.filial)
    rooms:RoomsEntity[]

    @OneToMany(()=>ServicesEntity,(services)=>services.filial)
    services:ServicesEntity[]
}