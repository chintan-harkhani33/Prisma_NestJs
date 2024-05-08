import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    CreateProfileDto: Prisma.ProfileCreateManyInput,
  ): Promise<object> {
    try {
      const { name, gender, age, userId, bio } = CreateProfileDto;
      if (!name || !gender || !age || !userId || !bio) {
        throw new BadRequestException(
          'name,gender , age,userid , bio , Profile is Rquired ',
        );
      }

      const Namefind = await this.prismaService.profile.findFirst({
        where: {
          name: CreateProfileDto.name,
        },
      });
      if (Namefind) {
        throw new BadRequestException('Name is Alerday Exist');
      }
      const Profile = await this.prismaService.profile.create({
        data: CreateProfileDto,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'User Profile Created SuccessFully',
        data: Profile,
      };
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create User Profile.',
        error: error.message,
      });
    }
  }

  async findAll(): Promise<object> {
    try {
      const FindProfile = await this.prismaService.profile.findMany();

      if (!FindProfile.length) {
        throw new BadRequestException('Profile not Found');
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Data Found',
        data: FindProfile,
      };
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create User Profile.',
        error: error.message,
      });
    }
  }

  async findOne(id: number): Promise<object> {
    try {
      const findData = await this.prismaService.profile.findUnique({
        where: { id },
      });
      if (!findData) {
        throw new BadRequestException('Profile Not Found');
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Data Found',
        data: findData,
      };
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create Profile.',
        error: error.message,
      });
    }
  }

  async update(
    id: number,
    updateProfileDto: Prisma.ProfileUncheckedUpdateManyInput,
  ): Promise<object> {
    try {
      const findData = await this.prismaService.profile.findUnique({
        where: { id },
      });
      if (!findData) {
        throw new BadRequestException('No Profile Data Found');
      }
      const UpdateProfile = await this.prismaService.profile.update({
        data: updateProfileDto,
        where: { id },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Data Updated SuccessFully',
        data: UpdateProfile,
      };
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to Update Profile.',
        error: error.message,
      });
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const findData = await this.prismaService.profile.findUnique({
        where: { id },
      });
      if (!findData) {
        throw new BadRequestException('Profile Data Found');
      }
      const DeleteProfile = await this.prismaService.profile.delete({
        where: { id },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Profile Data Deleted SuccessFully',
        data: DeleteProfile,
      };
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to  Profile Not Found.',
        error: error.message,
      });
    }
  }
}
