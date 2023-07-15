import mongoose, { Model } from 'mongoose';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation } from 'src/schemas/conversation.schema';
import { MyGateway } from 'src/geteway/geteway';
import { Message } from 'src/schemas/message.schema';
import { createImageMessage, createTextMessage } from './dto';

@Injectable()
export class ConversationService {
  constructor(
    private readonly myGateway: MyGateway,
    @InjectModel(Conversation.name) private convModel: Model<Conversation>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async createConversation(senderId: string, receiverId: string) {
    const conversation = await this.convModel.findOne({
      users: { $all: [senderId, receiverId] },
    });

    if (conversation) {
      return { id: conversation._id };
    }

    const newConversation = new this.convModel({
      users: [senderId, receiverId],
    });
    const savedConversation = await (
      await newConversation.save()
    ).populate({
      path: 'users',
      select: '_id name email image',
    });
    this.myGateway.server.emit('create conversation', {
      conversation: savedConversation,
    });
    return { id: savedConversation._id };
  }

  async getConversations(userId: string) {
    const conversations = await this.convModel
      .find({ users: userId })
      .populate({
        path: 'users',
        select: '_id name email image',
      })
      .select('-__v')
      .exec();
    this.myGateway.server.emit('eventName', { name: 'mohammed' });
    return { conversations };
  }

  async createMessageText(userId: string, dto: createTextMessage) {
    const newMessage = new this.messageModel({
      text: dto.text,
      conversaition: dto.conversationId,
      sender: userId,
    });
    await newMessage.save();
    return { msg: 'success' };
  }

  async createMessageImage(
    userId: string,
    dto: createImageMessage,
    imageUrl: string,
  ) {
    const newMessage = new this.messageModel({
      conversaition: dto.conversationId,
      sender: userId,
      image: { path: imageUrl, caption: dto.caption },
    });
    await newMessage.save();
    return { msg: 'success' };
  }

  async getMessages(conversationId: string) {
    const messages = await this.messageModel.find({
      conversaition: conversationId,
    });
    return { messages };
  }
}
