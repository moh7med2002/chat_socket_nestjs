import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type ConversationDocument = HydratedDocument<Conversation>;

@Schema({ timestamps: true })
export class Conversation {
  @Prop({
    required: true,
    type: [{ type: mongoose.Types.ObjectId, ref: User.name }],
  })
  users: string[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
