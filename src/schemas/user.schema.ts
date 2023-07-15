import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  image: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
