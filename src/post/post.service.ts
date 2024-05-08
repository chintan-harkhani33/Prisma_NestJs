import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createPostDto: Prisma.PostCreateManyInput): Promise<object> {
    try {
      const { title, content } = createPostDto;
      if (!title) {
        throw new BadRequestException('Title is Rquired ');
      }
      if (!content) {
        throw new BadRequestException('contant is Required..');
      }

      const titlefind = await this.prismaService.post.findFirst({
        where: {
          title: createPostDto.title,
        },
      });
      if (titlefind) {
        throw new BadRequestException('Title is not Exist');
      }
      const Post = await this.prismaService.post.create({
        data: createPostDto,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'User Created SuccessFully',
        data: Post,
      };
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create User.',
        error: error.message,
      });
    }
  }

  async findAll(): Promise<object> {
    try {
      const FindPost = await this.prismaService.post.findMany<object>({
        include: { tag: true },
      });

      if (!FindPost.length) {
        throw new BadRequestException('Post not Found');
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'POst Data Found',
        data: FindPost,
      };
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create User Post.',
        error: error.message,
      });
    }
  }

  async findOne(id: number): Promise<object> {
    try {
      const findPost = await this.prismaService.post.findUnique({
        where: { id },
      });
      if (!findPost) {
        throw new BadRequestException('Post Not Found');
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Post Data Found',
        data: findPost,
      };
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create Post.',
        error: error.message,
      });
    }
  }

  async update(
    id: number,
    updatePostDto: Prisma.PostUncheckedUpdateInput,
  ): Promise<object> {
    try {
      const findData = await this.prismaService.post.findUnique({
        where: { id },
      });
      if (!findData) {
        throw new BadRequestException('No Post Data Found');
      }
      const UpdatePost = await this.prismaService.post.update({
        data: updatePostDto,
        where: { id },
        // const UpdatePost = await this.prismaService.post.update({
        //   where: { id },
        //   data: {...updatePostDto , tag :{
        //     update: updatePostDto.tag.map(item =>({
        //       where :{ id : item.id},
        //       data : {
        //         contant : item.content,
        //       }
        //     }))
        //   }},
        include: { tag: true },
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Data Updated SuccessFully',
        data: UpdatePost,
      };
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to Update Post.',
        error: error.message,
      });
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const findData = await this.prismaService.post.findUnique({
        where: { id },
      });
      if (!findData) {
        throw new BadRequestException('post Data Found');
      }
      const DeletePost = await this.prismaService.post.delete({
        where: { id },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Post Data Deleted SuccessFully',
        data: DeletePost,
      };
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to Post Not Found.',
        error: error.message,
      });
    }
  }
}
