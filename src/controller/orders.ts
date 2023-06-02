import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { OrdersEntity } from '../entities/orders';

class OrdersController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(OrdersEntity).find({
            relations: [
                'services_orders', 'services_orders.products',
                'services_orders.services',
                'users',
                'rooms',
                'staff',
                'filial',
                'old'
            ],order:{id:"ASC"}
        }));
    }

    public async GetBusy(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(OrdersEntity).find({
            relations: [
                'services_orders', 'services_orders.products',
                'services_orders.services',
                'users',
                'rooms',
                'staff',
                'filial',
                'old'
            ],order:{id:"ASC"},
            where: { status: "busy" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        res.json(await AppDataSource.getRepository(OrdersEntity).find({
            where: { id: +id },
            relations: [
                'services_orders', 'services_orders.products',
                'services_orders.services',
                'users',
                'rooms',
                'staff',
                'filial',
                'old'
            ]
        }));
    }

    public async Post(req: Request, res: Response) {
        const { rooms, number_night, type_payment, phone, arrival_date, departure_date, count_users,country,status_payment, company, definition,booking,paid,debt, total_payable, comentary, staff, filial,company_details,sale } = req.body

        const orders = await AppDataSource.getRepository(OrdersEntity).createQueryBuilder().insert().into(OrdersEntity).values({rooms, number_night, type_payment, phone, arrival_date, departure_date, count_users,country,status_payment, company, definition,booking,paid,debt, total_payable, comentary, staff, filial,company_details,sale }).returning("*").execute()

        res.json({
            status: 201,
            message: "orders created",
            data: orders.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { rooms, number_night, type_payment, phone, arrival_date, departure_date, count_users,country,status_payment, company, definition,booking,paid,debt, total_payable, comentary, staff, filial,company_details,sale,status} = req.body
            const { id } = req.params

            const orders = await AppDataSource.getRepository(OrdersEntity).createQueryBuilder().update(OrdersEntity)
                .set({ rooms, number_night, type_payment, phone, arrival_date, departure_date, count_users,country,status_payment, company, definition,booking,paid,debt, total_payable, comentary, staff, filial,company_details,sale,status})
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "orders updated",
                data: orders.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const orders = await AppDataSource.getRepository(OrdersEntity).createQueryBuilder().update(OrdersEntity)
                .set({ status: "empty" })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "orders deleted",
                data: orders.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new OrdersController();
