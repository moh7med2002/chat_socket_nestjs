import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CustomStorage } from 'src/custom.storage';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto, UserLogin } from './dto';
import { Express } from 'express';
import { AuthGuard, CustomRequest } from 'src/common/guards.stradegey';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('image', { storage: CustomStorage.storage }))
  createUser(
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: CreateUserDto,
  ) {
    if (!image) {
      throw new NotFoundException('image upload is required');
    }
    return this.userService.create(image.filename, dto);
  }

  @Post('login')
  loginUser(@Body() dto: UserLogin) {
    return this.userService.login(dto);
  }

  @Get('all')
  @UseGuards(AuthGuard)
  all(@Request() req: CustomRequest) {
    return this.userService.getAllUsers(req.user.userId);
  }
}
