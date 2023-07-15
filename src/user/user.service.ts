import { Model } from 'mongoose';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto, UserLogin } from './dto';
import { VerifyPassword, hashPassword } from 'src/common/passwordUtil';
import { generateToken } from 'src/common/generateToken';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(image: string, dto: CreateUserDto): Promise<{ msg: string }> {
    const foundUserWithEmail = await this.userModel.findOne({
      email: dto.email,
    });
    if (foundUserWithEmail) {
      throw new ForbiddenException('email already exist');
    }
    const hashPs = await hashPassword(dto.password);
    const createdUser = new this.userModel({
      name: dto.name,
      email: dto.email,
      password: hashPs,
      image: image,
    });
    await createdUser.save();
    return { msg: 'user register success' };
  }

  async login(dto: UserLogin) {
    const foundUserWithEmail = await this.userModel.findOne({
      email: dto.email,
    });
    if (!foundUserWithEmail) {
      throw new ForbiddenException('Invalid Email');
    }
    const isMatch = await VerifyPassword(
      dto.password,
      foundUserWithEmail.password,
    );
    if (!isMatch) {
      throw new ForbiddenException('Invalid Password');
    }
    const token = generateToken({ userId: foundUserWithEmail._id.toString() });

    const userWithoutPassword = foundUserWithEmail.toJSON();
    delete userWithoutPassword.password;
    return { msg: 'user login success', token, user: userWithoutPassword };
  }

  async getAllUsers(userId: string) {
    const users = await this.userModel.find(
      { _id: { $nin: [userId] } },
      '_id name email image',
    );
    return { users };
  }
}
