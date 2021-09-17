import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUser } from './interface/user.interface';
import * as bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { RoleService } from '../role/role.service';
import { RoleEnum } from '../role/enum/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userSchema: Model<IUser>,
    private readonly roleService: RoleService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    let role;
    const exist = await this.userSchema.findOne({
      email: createUserDto.email,
    });
    if (exist) {
      throw new ConflictException('This User Exist');
    }
    if (!createUserDto.role) {
      const defaultRole = await this.roleService.getRoleByName(RoleEnum.COMMON);
      role = defaultRole._id;
    } else {
      role = createUserDto.role;
    }
    const hash = crypto.randomBytes(32);
    const salt = bcrypt.genSaltSync();
    createUserDto.password = bcrypt.hashSync(createUserDto.password, salt);
    createUserDto.codevalidate = hash.toString('hex');
    createUserDto.role = role;
    createUserDto.status = createUserDto.status ? createUserDto.status : false;
    const user = new this.userSchema(createUserDto);
    return await user.save();
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
