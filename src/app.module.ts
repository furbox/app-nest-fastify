import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleModule } from './app/module/module.module';
import { PermissionsModule } from './app/permissions/permissions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    ModuleModule,
    PermissionsModule,
  ],
})
export class AppModule {
  static port: number | string;
  constructor() {
    AppModule.port = process.env.PORT;
  }
}
