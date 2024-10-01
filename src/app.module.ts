import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [UsersModule, PostsModule, PrismaModule],
  controllers: [],
  providers: [PostsService],
})
export class AppModule {}
