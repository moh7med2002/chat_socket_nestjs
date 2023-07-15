import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import {
  Conversation,
  ConversationSchema,
} from 'src/schemas/conversation.schema';
import { MyGateway } from 'src/geteway/geteway';
import { Message, MessageSchema } from 'src/schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [ConversationController],
  providers: [MyGateway, ConversationService],
})
export class ConversationsModule {}
