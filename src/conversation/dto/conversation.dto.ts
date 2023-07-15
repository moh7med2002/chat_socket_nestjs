import { IsString, IsNotEmpty } from 'class-validator';

export class createConversation {
  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class createTextMessage {
  @IsNotEmpty()
  @IsString()
  conversationId: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}

export class createImageMessage {
  @IsNotEmpty()
  @IsString()
  conversationId: string;

  @IsNotEmpty()
  @IsString()
  caption: string;
}
