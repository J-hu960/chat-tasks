
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<TaskModel>;

@Schema()
export class TaskModel {
  @Prop({required:true})
  id: string;

  @Prop({required:true})
  title: string;

  @Prop({required:true})
  description: string;

  @Prop({required:true})
  date: string;

  @Prop({required:true,default: Date.now})
  created_at: Date;

  @Prop({required:true,default: Date.now})
  last_modified: Date;
  
  @Prop({type: Number})
  duration: number;

  @Prop({type: Number})
  hour: number;
  
  @Prop({ type: String, ref: 'User', required: true })
  user_id: string;

  @Prop({ type: String, ref: 'Party', required: true ,default:'none'})
  party_id: string;
  
  

}

export const TaskSchema = SchemaFactory.createForClass(TaskModel);
