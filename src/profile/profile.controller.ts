import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Prisma } from '@prisma/client';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}


  @Post('/create')
 async createUser(@Body() createProfileDto: Prisma.ProfileCreateManyInput):Promise<object> {
    return await this.profileService.create(createProfileDto);
  }

  @Get('/profiledata')
  async findAll():Promise<object> {
     return await this.profileService.findAll();
   }
 
   @Get('/profilefind/:id')
  async findOne(@Param('id' ,ParseIntPipe) id: number) : Promise<object>{
      return await this.profileService.findOne(id);
   }

   @Patch('/update/:id')
   async update(@Param('id' ,ParseIntPipe) id: number, @Body() UpdateProfileDto: Prisma.ProfileUncheckedUpdateManyInput):Promise<object> {
     return await this.profileService.update(id, UpdateProfileDto);
   }
 
   @Delete('/delete/:id')
  async remove(@Param('id' , ParseIntPipe) id: number):Promise<object> {
       return await this.profileService.remove(id);
   }
}
