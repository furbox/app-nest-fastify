import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Moddule } from './entities/module.entity';
import { IModule } from './interface/module.interface';

@Injectable()
export class ModuleService {
  private readonly logger = new Logger();
  constructor(
    @InjectModel(Moddule.name)
    private readonly moduleSchema: Model<IModule>,
  ) {}

  async create(createModuleDto: CreateModuleDto): Promise<IModule> {
    const exist = await this.moduleSchema.find({
      name: createModuleDto.name,
    });
    if (exist) {
      throw new ConflictException('This Module Exist');
    }
    const module = new this.moduleSchema(createModuleDto);
    return await module.save();
  }

  async findAll(): Promise<IModule[]> {
    const modules = await this.moduleSchema.find({});
    return modules;
  }

  async findOne(id: Types.ObjectId): Promise<IModule> {
    return await this.moduleSchema.findById(id);
  }

  async update(
    id: Types.ObjectId,
    updateModuleDto: UpdateModuleDto,
  ): Promise<IModule> {
    return await this.moduleSchema.findByIdAndUpdate(id, updateModuleDto, {
      new: true,
    });
  }

  async remove(id: Types.ObjectId) {
    const del = { status: false };
    return await this.moduleSchema.findByIdAndUpdate(id, del, { new: true });
  }
}
