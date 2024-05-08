import { PartialType } from '@nestjs/mapped-types';
import { CreateUserpDto } from './create-userp.dto';

export class UpdateUserpDto extends PartialType(CreateUserpDto) {}
