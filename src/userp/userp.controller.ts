import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserpService } from './userp.service';
import { CreateUserpDto } from './dto/create-userp.dto';
import { UpdateUserpDto } from './dto/update-userp.dto';
import { Prisma } from '@prisma/client';

@Controller('userp')
export class UserPController {
  constructor(private readonly UserpService: UserpService) {}

  @Post('/create')
 async createUser(@Body() createUserPDto: Prisma.UserPCreateManyInput):Promise<object> {
    return await this.UserpService.create(createUserPDto);
  }

  @Get('/finddata')
 async findAll():Promise<object> {
    return await this.UserpService.findAll();
  }

  @Get('/userfind/:id')
 async findOne(@Param('id' ,ParseIntPipe) id: number) : Promise<object>{
     return await this.UserpService.findOne(id);
  }

  @Patch('/update/:id')
  async update(@Param('id' ,ParseIntPipe) id: number, @Body() updateUserPDto: Prisma.UserPUpdateManyMutationInput):Promise<object> {
    return await this.UserpService.update(id, updateUserPDto);
  }

  @Delete('/delete/:id')
 async remove(@Param('id' , ParseIntPipe) id: number):Promise<object> {
      return await this.UserpService.remove(id);
  }
}
