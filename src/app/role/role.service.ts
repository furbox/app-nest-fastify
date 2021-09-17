import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { IRole } from './interface/role.interface';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleSchema: Model<IRole>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<IRole> {
    const exist = await this.roleSchema.findOne({
      name: createRoleDto.name,
    });
    if (exist) {
      throw new ConflictException('This Module Exist');
    }
    const role = new this.roleSchema(createRoleDto);
    return await role.save();
  }

  async findAll(): Promise<IRole[]> {
    return await this.roleSchema.find({}).populate({
      path: 'permissions',
      select: 'name namekey',
    });
  }

  async findOne(id: Types.ObjectId) {
    return await this.roleSchema.findById(id).populate({
      path: 'permissions',
      select: 'name namekey',
    });
  }

  async update(id: Types.ObjectId, updateRoleDto: UpdateRoleDto) {
    return await this.roleSchema.findByIdAndUpdate(id, updateRoleDto, {
      new: true,
    });
  }

  async remove(id: Types.ObjectId) {
    const del = { status: false };
    return await this.roleSchema.findByIdAndUpdate(id, del, {
      new: true,
    });
  }

  async getRoleByName(name: string) {
    return await this.roleSchema.findOne({ name });
  }
}
