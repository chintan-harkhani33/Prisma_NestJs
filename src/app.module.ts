import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { UserpModule } from './userp/userp.module';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [PrismaModule, UserModule, UserpModule, ProfileModule, PostModule, TagModule],
  providers: [AppService],
})
export class AppModule {}
