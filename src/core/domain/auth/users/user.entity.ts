import { Inject } from "@nestjs/common";
import { UserId } from "./value-objects/id";
import { UserMail } from "./value-objects/mail";
import { UserPassword } from "./value-objects/password";
import { Username } from "./value-objects/username";
import { ENCRYPTION_SERVICE, EncryptionService } from "../CryptService";

export class User{
    private readonly created_at:Date;
    private readonly updated_at:Date;
    private readonly isActive:boolean;
   private constructor(
     readonly id:UserId,
     readonly username:Username,
     readonly password:UserPassword,
     readonly email:UserMail,
    
   ){
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.updated_at = new Date;
        this.created_at = new Date;
        this.isActive = true;
   }

   static  create(usernamestr:string,plainpassword:string,emailstr:string){
        const id =UserId.new();
        const email = UserMail.create(emailstr)
        const username = Username.create(usernamestr);
        const hashed_password = UserPassword.create(plainpassword) //hashea internamente en la creación.
        

        return new User(id,username,hashed_password,email);
        
   }

   static fromMongoDoc(user_id:UserId,hashed_pass:string,usernameStr:string,emailStr:string){
     const id = user_id;
     const email = UserMail.create(emailStr)
     const username = Username.create(usernameStr);
     const hashed_password =UserPassword.fromExisting(hashed_pass)
     

     return new User(id,username,hashed_password,email);

   }
}