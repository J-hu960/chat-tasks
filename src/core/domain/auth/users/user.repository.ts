import { User } from "./user.entity";

export interface UserRepository{
    save(user:User):void;
    findByMail(email:string):User|undefined;
    findById(id:string):User | undefined;
}

export const USER_REPOSITORY = Symbol('user-repository')