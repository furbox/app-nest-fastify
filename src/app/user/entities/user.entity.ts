import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Role } from 'src/app/role/entities/role.entity';

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true, index: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  img: string;

  @Prop({ type: Date })
  createdAt: string;

  @Prop({ type: Date })
  updatedAt: string;

  @Prop({ type: Date })
  birthday: string;

  @Prop({ type: Date })
  lastdatelogin: string;

  @Prop({ type: Boolean, default: false })
  activationcode: boolean;

  @Prop({ type: Boolean, default: false })
  status: boolean;

  @Prop({ required: true })
  codevalidate: string;

  @Prop({ type: Number, default: 0 })
  countlogin: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: Role.name })
  role: mongoose.Types.ObjectId;
}

export type UserDocument = User & mongoose.Document;
export const UserSchema = SchemaFactory.createForClass(User);
