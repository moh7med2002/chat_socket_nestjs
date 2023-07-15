import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { AuthGuard, CustomRequest } from 'src/common/guards.stradegey';
import {
  createConversation,
  createImageMessage,
  createTextMessage,
} from './dto';
import { CustomStorage } from 'src/custom.storage';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('conversation')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  create(@Request() req: CustomRequest, @Body() dto: createConversation) {
    return this.conversationService.createConversation(
      req.user.userId,
      dto.userId,
    );
  }

  @Get('all')
  @UseGuards(AuthGuard)
  fetchAll(@Request() req: CustomRequest) {
    return this.conversationService.getConversations(req.user.userId);
  }

  @Get('messages/:conversationId')
  @UseGuards(AuthGuard)
  fetchAllMessages(
    @Request() req: CustomRequest,
    @Param('conversationId') id: string,
  ) {
    return this.conversationService.getMessages(id);
  }

  @Post('message/text')
  @UseGuards(AuthGuard)
  createtextMessage(
    @Request() req: CustomRequest,
    @Body() dto: createTextMessage,
  ) {
    return this.conversationService.createMessageText(req.user.userId, dto);
  }

  @Post('message/image')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image', { storage: CustomStorage.storage }))
  createImageMessage(
    @Request() req: CustomRequest,
    @Body() dto: createImageMessage,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image) {
      throw new NotFoundException('image upload is required');
    }
    return this.conversationService.createMessageImage(
      req.user.userId,
      dto,
      image.filename,
    );
  }
}
