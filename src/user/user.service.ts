import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: Prisma.UserCreateManyInput): Promise<object> {
    try {
      const { email, name } = createUserDto;
      if (!email) {
        throw new BadRequestException('Email is Rquired ');
      }
      if (!name) {
        throw new BadRequestException(' name is Required..');
      }
      const User = await this.prismaService.user.create({
        data: createUserDto,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'User Created SuccessFully',
        data: User,
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
      const FindData = await this.prismaService.user.findMany();

      if (!FindData.length) {
        throw new BadRequestException('No Data Found');
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Data Found',
        data: FindData,
      };
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create User.',
        error: error.message,
      });
    }
  }

 async findOne(id:number):Promise<object> {
    try {
      const findData =await  this.prismaService.user.findUnique({where : {id}})
      if (!findData) {
        throw new BadRequestException('No Data Found');
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Data Found',
        data: findData,
      }  
    } catch (error) {
         
      throw new BadRequestException({
         statusCode : HttpStatus.BAD_REQUEST,
         message : 'Failed to create User.',
         error : error.message
        })
    }
  }

async update(id: number, updateUserDto: Prisma.UserUncheckedUpdateManyInput):Promise<object> {
   try {
    const findData =await  this.prismaService.user.findUnique({where : {id}})
    if (!findData) {
      throw new BadRequestException('No Data Found');
    }
    const UpdateUser = await this.prismaService.user.update({
      data : updateUserDto,
      where : {id}
    })

    return {
      statusCode : HttpStatus.OK,
      message : 'Data Updated SuccessFully',
      data : UpdateUser
    }

   } catch (error) {
    throw new BadRequestException({
      statusCode : HttpStatus.BAD_REQUEST,
      message : 'Failed to Update User.',
      error : error.message
     })
   }
  }

 async remove(id: number):Promise<object> {
   try {
    const findData =await  this.prismaService.user.findUnique({where : {id}})
    if (!findData) {
      throw new BadRequestException('No Data Found');
    }
    const DeleteUser = await this.prismaService.user.delete({ where :{id}})

    return {
      statusCode : HttpStatus.OK,
      message : 'Data Deleted SuccessFully',
      data : DeleteUser
    }
   } catch (error) {
    throw new BadRequestException({
      statusCode : HttpStatus.BAD_REQUEST,
      message : 'Failed to  User Not Found.',
      error : error.message
     })
   }
  }
}
