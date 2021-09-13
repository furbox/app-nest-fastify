import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Moddule } from './entities/module.entity';
import { IModule } from './interface/module.interface';

@Injectable()
export class ModuleService {
  constructor(
    @InjectModel(Moddule.name)
    private readonly moduleSchema: Model<IModule>,
  ) {}

  async create(createModuleDto: CreateModuleDto): Promise<IModule> {
    const exist = await this.moduleSchema.find({ name: createModuleDto.name });
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

  findOne(id: number) {
    return `This action returns a #${id} module`;
  }

  update(id: number, updateModuleDto: UpdateModuleDto) {
    return `This action updates a #${id} module`;
  }

  remove(id: number) {
    return `This action removes a #${id} module`;
  }
}
