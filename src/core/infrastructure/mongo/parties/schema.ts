
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { string } from 'zod';

export type PartyDocument = HydratedDocument<PartyModel>;

@Schema({collection:'parties'})
export class PartyModel {
  @Prop({required:true})
  id: string;

  @Prop({required:true})
  name: string;

  @Prop({required:true})
  created_by: string;

  @Prop({required:true})
  code: string;

  @Prop({required:true,type:[string]})
  users_ids:string[]

  @Prop({required:true,default: new Date})
  created_at: Date;

  @Prop({required:true,default: new Date})
  last_modified: Date;
  
  
}

export const PartySchema = SchemaFactory.createForClass(PartyModel);
