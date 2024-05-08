import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Prisma } from '@prisma/client';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}


  @Post('/create')
 async createUser(@Body() createPostDto: Prisma.PostCreateManyInput):Promise<object> {
    return await this.postService.create(createPostDto);
  }

  @Get('/postdata')
  async findAll():Promise<object> {
     return await this.postService.findAll();
   }

   @Get('/postfind/:id')
   async findOne(@Param('id' ,ParseIntPipe) id: number) : Promise<object>{
       return await this.postService.findOne(id);
    }

    @Patch('/update/:id')
    async update(@Param('id' ,ParseIntPipe) id: number, @Body() UpdatePostDto: Prisma.PostUncheckedUpdateInput):Promise<object> {
      return await this.postService.update(id, UpdatePostDto);
    }
  
    @Delete('/delete/:id')
   async remove(@Param('id' , ParseIntPipe) id: number):Promise<object> {
        return await this.postService.remove(id);
    }
}
