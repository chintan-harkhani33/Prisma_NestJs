import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prismaService  : PrismaService){}
  async create(createtagPDto: Prisma.TagCreateManyInput): Promise<object> {
    try {
      const { content } = createtagPDto;
      if (!content) {
        throw new BadRequestException('Content is Required..');
      }
      const Tag= await this.prismaService.tag.create({
        data: createtagPDto,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'User Post SuccessFully',
        data: Tag,
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
      const Findtag = await this.prismaService.tag.findMany({
        include :{
          post : true
        }
      });
  
      if (!Findtag.length) {
        throw new BadRequestException('No Data Found');
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Data Found',
        data: Findtag,
      };
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create Tag.',
        error: error.message,
      });
    }
  }
  async findOne(id: number): Promise<object> {
    try {
      const findTag = await this.prismaService.tag.findUnique({
        where: { id },
      });
      if (!findTag) {
        throw new BadRequestException('Tag Not Found');
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Tag Data Found',
        data: findTag,
      };
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create Tag.',
        error: error.message,
      });
    }
  }

  async update(
    id: number,
    updateTagDto: Prisma.TagUncheckedUpdateManyInput,
  ): Promise<object> {
    try {
      const findData = await this.prismaService.tag.findUnique({
        where: { id },
      });
      if (!findData) {
        throw new BadRequestException('No Post Data Found');
      }
      const UpdateTag = await this.prismaService.tag.update({
        data: updateTagDto,
        where: { id },
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Data Updated SuccessFully',
        data: UpdateTag,
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
      const findData = await this.prismaService.tag.findUnique({
        where: { id },
      });
      if (!findData) {
        throw new BadRequestException('Tag Data Found');
      }
      const DeleteTag = await this.prismaService.tag.delete({
        where: { id },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Tag Data Deleted SuccessFully',
        data: DeleteTag,
      };
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to Tag Not Found.',
        error: error.message,
      });
    }
  }
}
