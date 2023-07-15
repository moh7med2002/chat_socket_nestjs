import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Conversation } from './conversation.schema';
import { User } from './user.schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop()
  text: string;

  @Prop(
    raw({
      path: { type: String },
      caption: { type: String },
    }),
  )
  image: Record<string, any>;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  sender: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Conversation.name,
  })
  conversaition: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
