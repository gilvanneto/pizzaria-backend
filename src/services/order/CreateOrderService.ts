import prismaClient from "../../prisma";

interface OrderRequest{
    tabel: number;
    name: string;
}


class CreateOrderService{
    async execute({tabel ,name}:OrderRequest){

        const order = await prismaClient.order.create({
            data:{
                tabel: tabel,
                name: name
            }
        })

        return order;


    }


}

export {CreateOrderService};