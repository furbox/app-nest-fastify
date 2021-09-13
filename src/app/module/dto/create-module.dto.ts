import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
