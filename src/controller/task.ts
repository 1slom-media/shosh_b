import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { TaskEntity } from '../entities/task';

class UsersController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(TaskEntity).find({
            relations: {
                staff:true
            }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        res.json(await AppDataSource.getRepository(TaskEntity).find({
            where: { id: +id },
            relations: {
                staff:true
            }
        }));
    }

    public async Post(req: Request, res: Response) {
        const {task,importance,dispatch_time,deadline,staff} = req.body

        const tasks = await AppDataSource.getRepository(TaskEntity).createQueryBuilder().insert().into(TaskEntity).values({task,importance,dispatch_time,deadline,staff}).returning("*").execute()

        res.json({
            status: 201,
            message: "task created",
            data: tasks.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const {task,importance,dispatch_time,deadline,staff } = req.body
            const { id } = req.params

            const tasks = await AppDataSource.getRepository(TaskEntity).createQueryBuilder().update(TaskEntity)
                .set({ task,importance,dispatch_time,deadline,staff})
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "task updated",
                data: tasks.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const tasks = await AppDataSource.getRepository(TaskEntity).createQueryBuilder().update(TaskEntity)
                .set({ status: "see" })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "task deleted",
                data: tasks.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new UsersController();
