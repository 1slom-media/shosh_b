import "reflect-metadata"
import { DataSource } from "typeorm"
import { ConsumptionEntity } from "./entities/consumption"
import { ConsumptionCategoryEntity } from "./entities/consumption_category"
import { FilialEntity } from "./entities/filials"
import { LidsEntity } from "./entities/lids"
import { OrdersEntity } from "./entities/orders"
import { ProductsEntity } from "./entities/products"
import { RoomsEntity } from "./entities/rooms"
import { ServicesEntity } from "./entities/services"
import { ServicesOrdersEntity } from "./entities/services_orders"
import { StaffEntity } from "./entities/staff"
import { TaskEntity } from "./entities/task"
import { UsersEntity } from "./entities/users"
import { ChangeEntity } from "./entities/change"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1sU*DtM&9RfB",
    database: "shosh_b",
    synchronize: true,
    logging: false,
    entities: [FilialEntity, StaffEntity, RoomsEntity, UsersEntity, LidsEntity, ConsumptionCategoryEntity,ConsumptionEntity,OrdersEntity,ServicesEntity,ProductsEntity,ServicesOrdersEntity,TaskEntity,ChangeEntity],
    migrations: [],
    subscribers: [],
})
