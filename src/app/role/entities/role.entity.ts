import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Permission } from '../../permissions/entities/permission.entity';

@Schema({ timestamps: true, versionKey: false })
export class Role {
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

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: Permission.name }] })
  permissions: mongoose.Types.ObjectId[];
}

export type RoleDocument = Role & mongoose.Document;
export const RoleSchema = SchemaFactory.createForClass(Role);
