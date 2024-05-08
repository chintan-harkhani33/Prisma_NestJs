import { Module } from '@nestjs/common';
import { UserpService } from './userp.service';
import { UserPController } from './userp.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
// import { PrismaService } from 'src/prisma/prisma.service';

@Module({
   imports :[PrismaModule],
  controllers: [UserPController],
  providers: [UserpService],
})
export class UserpModule {}
