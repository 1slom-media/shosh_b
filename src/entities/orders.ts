import { IsString, isArray} from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { FilialEntity } from "./filials";
import { RoomsEntity } from "./rooms";
import { ServicesOrdersEntity } from "./services_orders";
import { StaffEntity } from "./staff";
import { UsersEntity } from "./users";
import { OldOrdersEntity } from "./old_order";



@Entity({ name: "oders" })
export class OrdersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 200 })
    @IsString()
    number_night: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    type_payment: string

    @Column({ type: "varchar", length: 100,nullable:true })
    @IsString()
    status_payment: string

    @Column({ type: "varchar", length: 200,nullable:true })
    @IsString()
    phone: string

    @Column({ type: "varchar", length: 100,nullable:true,default:0 })
    @IsString()
    sale: string

    @Column({ type: "varchar", length: 100,nullable:true,default:0 })
    @IsString()
    definition: string

    @Column({ type: "varchar", length: 100 })
    @IsString()
    arrival_date: string
    
    @Column({ type: "varchar", length: 100 })
    @IsString()
    departure_date: string

    @Column({ type: "varchar", length: 100,nullable:true })
    @IsString()
    count_users: string

    @Column({ type: "varchar", length: 200,nullable:true })
    @IsString()
    company: string

    @Column({ type: "varchar", length: 200 })
    @IsString()
    total_payable: string

    @Column({ type: "varchar", length: 500,nullable:true })
    @IsString()
    company_details: string

    @Column({ type: "varchar", length: 200,default:0})
    @IsString()
    booking: string

    @Column({ type: "varchar", length: 200, default:0 })
    @IsString()
    paid: string

    @Column({ type: "varchar", length: 200, default:0 })
    @IsString()
    debt: string

    @Column({ type: "text",nullable:true })
    @IsString()
    country: string

    @Column({ type: "text",nullable:true })
    @IsString()
    comentary: string

    @Column({ type: "varchar", length: 100, default:"busy" })
    @IsString()
    status: string

    @Column({ type: "varchar", length: 100, default:"active" })
    @IsString()
    status_client: string

    @Column({ type: "varchar", default:"#0419fd"})
    @IsString()
    color: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(() => StaffEntity, (staff) => staff.orders)
    staff: StaffEntity

    @OneToMany(() => UsersEntity, (users) => users.orders,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    users: UsersEntity[]

    @OneToMany(() => OldOrdersEntity, (old) => old.orders,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    old: OldOrdersEntity[]

    @ManyToOne(()=>RoomsEntity,(rooms)=>rooms.orders)
    rooms:RoomsEntity

    @ManyToOne(()=>FilialEntity,(filial)=>filial.orders)
    filial:FilialEntity

    @OneToMany(() => ServicesOrdersEntity, (services_orders) => services_orders.orders,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    services_orders: ServicesOrdersEntity[]
}