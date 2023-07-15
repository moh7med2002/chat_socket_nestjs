import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MulterModule } from '@nestjs/platform-express';
import { CustomStorage } from './custom.storage';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user/user.module';
import { ConversationsModule } from './conversation/conversation.module';
import { GatewayModule } from './geteway/geteway.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mohamed:059283805928388@cluster0.aueco.mongodb.net/nestJs?retryWrites=true&w=majority',
    ),
    JwtModule.register({ global: true, secret: 'token' }),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: CustomStorage.storage,
      }),
    }),
    UsersModule,
    ConversationsModule,
    GatewayModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
