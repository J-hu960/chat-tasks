import { UserId } from "./value-objects/id";
import { UserMail } from "./value-objects/mail";
import { UserPassword } from "./value-objects/password";
import { Username } from "./value-objects/username";

export class User{
    private readonly created_at:Date;
    private readonly updated_at:Date;
    private readonly isActive:boolean;
   private constructor(
     readonly id:UserId,
     private readonly username:Username,
     readonly password:UserPassword,
     readonly email:UserMail,
     readonly token:string,
     readonly refresh_token:string
    
   ){
        this.id = id;
        this.username = username;
        this.password = password;
        this.updated_at = new Date;
        this.created_at = new Date;
        this.isActive = true;
        this.token = token;
        this.refresh_token = refresh_token;
   }

   static create(usernamestr:string,plainpassword:string,emailstr:string,token:string,refresh_token:string){
        const id = UserId.new();
        const email = UserMail.create(emailstr)
        const username = Username.create(usernamestr);
        const hashed_password = new UserPassword(plainpassword) //hashea internamente en la creación.
        

        return new User(id,username,hashed_password,email,token,refresh_token);
        

   }
}