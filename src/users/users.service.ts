import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) throw new HttpException('User not found', 400);
    return user;
  }

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: data });
  }

  async updateUserById(id: number, data: Prisma.UserUpdateInput) {
    this.getUserById(id);
    if (data.username) {
      const user = await this.prisma.user.findUnique({
        where: { username: data.username as string },
      });
      if (user && user.username === data.username) return user;
      if (user) throw new HttpException('Username already exists', 400);
    }
    return this.prisma.user.update({ where: { id: id }, data: data });
  }

  // deleteUserById(id: number) {
  //   const user = awi
  // }
}
