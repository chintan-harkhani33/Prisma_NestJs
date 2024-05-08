import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
 async createUser(@Body() createUserDto: Prisma.UserCreateManyInput):Promise<object> {
    return  await this.userService.create( createUserDto);
  }

  @Get('/finddata')
 async findAll():Promise<object> {
    return await this.userService.findAll();
  }

  @Get('/userfind/:id')
 async findOne(@Param('id' ,ParseIntPipe) id: number) : Promise<object>{
     return await this.userService.findOne(id);
  }

  @Patch('/update/:id')
  async update(@Param('id' ,ParseIntPipe) id: number, @Body() updateUserDto: Prisma.UserUncheckedUpdateManyInput):Promise<object> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete('/delete/:id')
 async remove(@Param('id' , ParseIntPipe) id: number):Promise<object> {
      return await this.userService.remove(id);
  }
}
