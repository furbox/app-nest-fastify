import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permission, PermissionSchema } from './entities/permission.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Permission.name,
        useFactory: () => {
          return PermissionSchema;
        },
      },
    ]),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
