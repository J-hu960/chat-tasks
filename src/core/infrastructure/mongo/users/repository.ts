import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from 'src/core/domain/auth/users/user.repository';
import { User } from 'src/core/domain/auth/users/user.entity';
import { UserDocument, UserModel } from './schema';
import { UserId } from 'src/core/domain/auth/users/value-objects/id';

@Injectable()
export class MongoUserRepository implements UserRepository {
  constructor(@InjectModel(UserModel.name) private userModel: Model<UserModel>) {}

  async save(user: User): Promise<void> {
    const createdUser = new this.userModel({
      id:user.id.value,
      mail:user.email.email,
      password:user.password.hashed,
      username:user.username.username,      
    });
    await createdUser.save();
  }

  async findByMail(email: string): Promise<User | undefined> {
    console.log(`Looking for user with email = ${email}`)
    const userDoc = await this.userModel.findOne({ mail: email }).exec();
    if (!userDoc){
       return undefined;
      }
    return this.toDomainUser(userDoc);
  }

  async findById(id: string): Promise<User | undefined> {
    const userDoc = await this.userModel.findOne({ id }).exec();
    if (!userDoc) return undefined;

    return this.toDomainUser(userDoc);
  }

  async updateUserLastCheckActivity(user_id:string,new_date: Date): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { id: user_id },
      { $set: { last_activity_check: new_date } },
      { new: true, runValidators: true }
    );

  }

  private toDomainUser(userDoc: UserDocument): User {
    const domainUser = User.fromMongoDoc(UserId.fromExisting(userDoc.id),userDoc.password,userDoc.username,userDoc.mail,userDoc.last_activity_check);
    console.log(domainUser.id)
    return domainUser
  }
}
