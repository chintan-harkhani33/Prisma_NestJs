import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Prisma } from '@prisma/client';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

    @Post('/create')
    async createUser(@Body() createUserPDto: Prisma.TagCreateManyInput):Promise<object> {
      return await this.tagService.create(createUserPDto);
    }

    @Get('/finddata')
    async findAll():Promise<object> {
       return await this.tagService.findAll();
     }

     @Get('/tagfind/:id')
     async findOne(@Param('id' ,ParseIntPipe) id: number) : Promise<object>{
         return await this.tagService.findOne(id);
      }
  
      @Patch('/update/:id')
      async update(@Param('id' ,ParseIntPipe) id: number, @Body() updatePostDto: Prisma.TagUncheckedUpdateManyInput):Promise<object> {
        return await this.tagService.update(id, updatePostDto);
      }
    
      @Delete('/delete/:id')
     async remove(@Param('id' , ParseIntPipe) id: number):Promise<object> {
          return await this.tagService.remove(id);
      }
}
