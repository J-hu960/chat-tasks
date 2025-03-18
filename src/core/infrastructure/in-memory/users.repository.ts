import { TaskRepository } from "src/core/domain/calendar-bot/tasks/tasks.repository";
import { User } from "src/core/domain/auth/users/user.entity";
import { UserRepository } from "src/core/domain/auth/users/user.repository";

export class UserRepositoryInmemory implements UserRepository{
    readonly users:User[] = [];

    save(User:User){
        this.users.push(User);
    }

    async findByMail(mail:string): Promise<User> | undefined {
        for(let i = 0; i < this.users.length; i++){
            if(this.users[i].email.email===mail){
                return this.users[i];
            }
        }

        return undefined
    }

    async findById(id: string): Promise<User>| undefined {
        for(let i = 0; i < this.users.length; i++){
            if(this.users[i].id.value===id){
                return this.users[i];
            }
        }

        return undefined
    }

    async updateUserLastCheckActivity(user_id: string, new_date: Date): Promise<void> {
        return
    }

}