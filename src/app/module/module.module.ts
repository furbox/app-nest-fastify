import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleSchema } from './entities/module.entity';
import { Moddule } from './entities/module.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Moddule.name,
        useFactory: () => {
          return ModuleSchema;
        },
      },
    ]),
  ],
  controllers: [ModuleController],
  providers: [ModuleService],
  exports: [ModuleService],
})
export class ModuleModule {}
