import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { RoomsEntity } from '../entities/rooms';

class RoomsController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(RoomsEntity).find({
            relations: {
                filial: true,
                orders:true
            }
        }));
    }

    public async GetEmpty(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(RoomsEntity).find({
            relations: {
                filial: true,
                orders:true
            }, where: { status: "empty" }
        }));
    }



    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(RoomsEntity).find({
            relations: {
                filial: true,
                orders:true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { rooms, count, type, definition, status, filial } = req.body

        const room = await AppDataSource.getRepository(RoomsEntity).createQueryBuilder().insert().into(RoomsEntity).values({ rooms, count, type, definition, status, filial }).returning("*").execute()

        res.json({
            status: 201,
            message: "rooms created",
            data: room.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { rooms, type, count, status, filial } = req.body
            const { id } = req.params

            const room = await AppDataSource.getRepository(RoomsEntity).createQueryBuilder().update(RoomsEntity)
                .set({ rooms, type, count, status, filial })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "Rooms updated",
                data: room.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const room = await AppDataSource.getRepository(RoomsEntity).createQueryBuilder().delete().from(RoomsEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "rooms deleted",
                data: room.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new RoomsController();