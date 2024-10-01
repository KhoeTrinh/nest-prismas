import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createPostDto } from './dto/createPost.dto';
import { PostsService } from './posts.service';
import { createGroupPostDto } from './dto/createGroupPost.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
    @Get('group')
    getGroupPosts() {
        return this.postsService.getGroupPosts()
    }

  @Post('/')
  @UsePipes(new ValidationPipe())
  createPost(@Body() { userId, ...data }: createPostDto) {
    return this.postsService.createPost(userId, data);
  }

  @Post('/group')
  @UsePipes(new ValidationPipe())
  createGroupPost(@Body() { userId, ...data }: createGroupPostDto) {
    return this.postsService.createGroupPost(userId, data);
  }
}
