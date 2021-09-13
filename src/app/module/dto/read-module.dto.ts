import { ApiProperty } from '@nestjs/swagger';

export class ReadModuleDto {
  @ApiProperty()
  readonly _id: string;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  readonly createAt: string;
}
