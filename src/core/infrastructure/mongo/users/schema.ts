
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel>;

@Schema({collection:'users'})
export class UserModel {
  @Prop({required:true})
  id: string;

  @Prop({required:true})
  username: string;

  @Prop({required:true})
  mail: string;

  @Prop({required:true})
  password: string;

  @Prop({required:true,default: new Date})
  created_at: Date;

  @Prop({required:true,default: new Date})
  last_modified: Date;
  
  @Prop()
  verification_code: string;

  @Prop()
  verification_code_expires: Date;
  
  @Prop({required:true,default:true})
  is_active: boolean;

}

export const UserSchema = SchemaFactory.createForClass(UserModel);
