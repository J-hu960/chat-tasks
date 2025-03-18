import { User } from "./user.entity";

export interface UserRepository{
    save(user:User):void;
    findByMail(email:string):Promise<User>|undefined;
    findById(id:string):Promise<User> | undefined;
    updateUserLastCheckActivity(user_id:string,new_date:Date):Promise<void>;
}

export const USER_REPOSITORY = Symbol('user-repository')