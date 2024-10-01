import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Post('/')
  @UsePipes(new ValidationPipe())
  createUser(@Body() data: createUserDto) {
    return this.userService.createUser(data);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  updateUserById(@Param('id', ParseIntPipe) id: number, @Body() data: updateUserDto) {
    return this.userService.updateUserById(id, data);
  }

  @Delete('/:id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    
  }
}
