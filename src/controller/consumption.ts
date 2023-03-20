import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ConsumptionEntity } from '../entities/consumption';

class ConsumptionController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(ConsumptionEntity).find({
            relations: {
                consumption_category: true
            }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        res.json(await AppDataSource.getRepository(ConsumptionEntity).find({
            relations: {
                consumption_category: true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { amount, type_payment, comentary, consumption_category } = req.body

        const consumption = await AppDataSource.getRepository(ConsumptionEntity).createQueryBuilder().insert().into(ConsumptionEntity).values({ amount, type_payment, comentary, consumption_category }).returning("*").execute()

        res.json({
            status: 201,
            message: "Consumption created",
            data: consumption.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { amount, type_payment, comentary, consumption_category } = req.body
            const {id}=req.params

            const consumption = await AppDataSource.getRepository(ConsumptionEntity).createQueryBuilder().update(ConsumptionEntity)
            .set({amount, type_payment, comentary, consumption_category})
            .where({ id })
            .returning("*")
            .execute()

            res.json({
                status: 200,
                message: "Consumption updated",
                data: consumption.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const {id}=req.params

            const consumption = await AppDataSource.getRepository(ConsumptionEntity).createQueryBuilder().delete().from(ConsumptionEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "Consumption deleted",
                data: consumption.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ConsumptionController();