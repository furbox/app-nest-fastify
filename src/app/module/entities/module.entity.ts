import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Moddule {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Date })
  createdAt: string;

  @Prop({ type: Date })
  updatedAt: string;

  @Prop({ type: Boolean, default: true })
  status: boolean;
}

export type ModuleDocument = Moddule & mongoose.Document;
export const ModuleSchema = SchemaFactory.createForClass(Moddule);
