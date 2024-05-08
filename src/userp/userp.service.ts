import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
// import { CreateUserpDto } from './dto/create-userp.dto';
import { UpdateUserpDto } from './dto/update-userp.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserpService {
constructor (private readonly  prismaService  :PrismaService){}
async create(createUserPDto: Prisma.UserPCreateManyInput): Promise<object> {
  try {
    const { email,password  } = createUserPDto;
    if (!email) {
      throw new BadRequestException('Email is Rquired ');
    }
    if (!password) {
      throw new BadRequestException(' Password is Required..');
    }

    const emailfind  = await this.prismaService.userP.findFirst({
      where:{
        email:email
      } 
    })
    if(emailfind){
      throw new BadRequestException('Email is not Exist')
    }
    const UserP = await this.prismaService.userP.create({
      data: createUserPDto,
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'User Created SuccessFully',
      data: UserP,
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
    const FindData = await this.prismaService.userP.findMany({
      include :{
        profile:true,
        post :true
      }
    });

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
    const findData =await this.prismaService.userP.findUnique({include:{profile:true}, where : {id} })
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


async update(id: number, updateUserpDto: Prisma.UserPUpdateManyMutationInput):Promise<object> {
  try {
   const findData =await  this.prismaService.userP.findUnique({where : {id}})
   if (!findData) {
     throw new BadRequestException('No Data Found');
   }
   const UpdateUser = await this.prismaService.userP.update({
     data : updateUserpDto,
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
   const findData = await  this.prismaService.userP.findUnique({where : {id}})
   if (!findData) {
     throw new BadRequestException('No Data Found');
   }
   const DeleteUser = await this.prismaService.userP.delete({ where :{id}})

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
