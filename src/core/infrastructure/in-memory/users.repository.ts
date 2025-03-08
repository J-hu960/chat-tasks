import { TaskRepository } from "src/core/domain/calendar-bot/tasks/tasks.repository";
import { User } from "src/core/domain/auth/users/user.entity";
import { UserRepository } from "src/core/domain/auth/users/user.repository";

export class UserRepositoryInmemory implements UserRepository{
    readonly users:User[] = [];

    save(User:User){
        this.users.push(User);
    }

    findByMail(mail:string): User | undefined {
        for(let i = 0; i < this.users.length; i++){
            if(this.users[i].email.email===mail){
                return this.users[i];
            }
        }

        return undefined
    }

    findById(id: string): User | undefined {
        for(let i = 0; i < this.users.length; i++){
            if(this.users[i].id.value===id){
                return this.users[i];
            }
        }

        return undefined
    }

}