import { User } from "./user.entity";

export interface UserRepository{
    save(user:User):void;
    findByMail(email:string):Promise<User>|undefined;
    findById(id:string):Promise<User> | undefined;
}

export const USER_REPOSITORY = Symbol('user-repository')