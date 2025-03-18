import { Inject } from "@nestjs/common";
import { UserId } from "./value-objects/id";
import { UserMail } from "./value-objects/mail";
import { UserPassword } from "./value-objects/password";
import { Username } from "./value-objects/username";
import { ENCRYPTION_SERVICE, EncryptionService } from "../CryptService";

export class User{
     readonly created_at:Date;
     readonly updated_at:Date;
     readonly isActive:boolean;
   private constructor(
     readonly id:UserId,
     readonly username:Username,
     readonly password:UserPassword,
     readonly email:UserMail,
     readonly last_check?:Date
    
   ){
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.updated_at = new Date;
        this.created_at = new Date;
        this.isActive = true;
        this.last_check = last_check || new Date;
        
   }

   static  create(usernamestr:string,plainpassword:string,emailstr:string){
        const id =UserId.new();
        const email = UserMail.create(emailstr)
        const username = Username.create(usernamestr);
        const hashed_password = UserPassword.create(plainpassword) //hashea internamente en la creación.
        

        return new User(id,username,hashed_password,email);
        
   }

   static fromMongoDoc(user_id:UserId,hashed_pass:string,usernameStr:string,emailStr:string,last_activity_check:Date){
     const id = user_id;
     const email = UserMail.create(emailStr)
     const username = Username.create(usernameStr);
     const hashed_password =UserPassword.fromExisting(hashed_pass)
     

     return new User(id,username,hashed_password,email,last_activity_check);

   }
}