import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Moddule } from 'src/app/module/entities/module.entity';

@Schema({ timestamps: true, versionKey: false })
export class Permission {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  namekey: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Date })
  createdAt: string;

  @Prop({ type: Date })
  updatedAt: string;

  @Prop({ type: Boolean, default: true })
  status: boolean;

  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: Moddule.name })
  module: mongoose.Types.ObjectId;
}

export type PermissionDocument = Permission & mongoose.Document;
export const PermissionSchema = SchemaFactory.createForClass(Permission);
