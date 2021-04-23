import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

class UserService{
    private usersRepository: Repository<User>;

    constructor(){
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create(email: string){
        //Verifica se o usuario existe
        const userExists = await this.usersRepository.findOne({email});

        //Se existir retorna o user
        if(userExists){
            return userExists;
        }

        const user = this.usersRepository.create({email});

        //Caso não exista salva no banco de dados
        await this.usersRepository.save(user);

        //E aqui retorna o user que foi adicionado ou que já existia
        return user;
    }

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({ email });
    
        return user;
    }
}

export {UserService};