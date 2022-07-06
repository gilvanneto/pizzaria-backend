import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController{

    async handle(req: Request, res: Response){

        const {tabel, name} = req.body;

        const createOrderService = new CreateOrderService();
       const order = await  createOrderService.execute({
            name,
            tabel
        });

        return res.json(order);

    }

}

export {CreateOrderController};