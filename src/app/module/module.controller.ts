import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

@ApiTags('Modules')
@Controller('v1/module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post()
  @ApiOperation({ summary: 'Create module' })
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.moduleService.create(createModuleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all modules' })
  findAll() {
    return this.moduleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one module' })
  findOne(@Param('id') id: Types.ObjectId) {
    return this.moduleService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update module' })
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updateModuleDto: UpdateModuleDto,
  ) {
    return this.moduleService.update(id, updateModuleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete module' })
  remove(@Param('id') id: Types.ObjectId) {
    return this.moduleService.remove(id);
  }
}
