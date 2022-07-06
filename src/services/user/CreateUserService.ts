import prismaClient from '../../prisma';
import {hash} from 'bcryptjs';

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreteUserService{
    async execute({name, email, password}:UserRequest){
        //verificar se enviou um email
        if(!email){
            throw new Error ("Email incorrect")
        }

        //verificar se o email já está cadastrado na platafora
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error ("User already exists")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email, 
                password: passwordHash,
            },
            select:{
                id: true,
                name: true,
                email: true,
            }
        })

        return user;
    }

}

export {CreteUserService}; 