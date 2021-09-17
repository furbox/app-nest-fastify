import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Types, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from './entities/permission.entity';
import { IPermissions } from './interface/permission.interface';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionSchema: Model<IPermissions>,
  ) {}

  async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<IPermissions> {
    const exist = await this.permissionSchema.findOne({
      namekey: createPermissionDto.namekey,
    });
    if (exist) {
      throw new ConflictException('This Permissions Exist');
    }
    const permission = new this.permissionSchema(createPermissionDto);
    return await permission.save();
  }

  async findAll(): Promise<IPermissions[]> {
    return await this.permissionSchema.find({});
  }

  async findOne(id: Types.ObjectId): Promise<IPermissions> {
    return await this.permissionSchema.findById(id);
  }

  async update(
    id: Types.ObjectId,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<IPermissions> {
    return await this.permissionSchema.findByIdAndUpdate(
      id,
      updatePermissionDto,
      { new: true },
    );
  }

  async remove(id: Types.ObjectId): Promise<IPermissions> {
    const del = { status: false };
    return await this.permissionSchema.findByIdAndUpdate(id, del, {
      new: true,
    });
  }
}
