import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getUsers() {
    return this.prisma.user.findMany({
      include: {
        userSettings: {
          select: {
            smsOn: true,
            notificationsOn: true,
          },
        },
        posts: {
          select: {
            title: true,
            description: true,
          },
        }
      },
    });
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      include: {
        userSettings: {
          select: {
            smsOn: true,
            notificationsOn: true,
          },
        },
        posts: {
          select: {
            title: true,
            description: true,
          },
        }
      },
    });
    if (!user) throw new HttpException('User not found', 400);
    return user;
  }

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...data,
        userSettings: { create: { smsOn: true, notificationsOn: false } },
      },
      include: {
        userSettings: {
          select: {
            smsOn: true,
            notificationsOn: true,
          },
        },
        posts: {
          select: {
            title: true,
            description: true,
          },
        }
      },
    });
  }

  async updateUserById(id: number, data: Prisma.UserUpdateInput) {
    const user = await this.getUserById(id);
    if (!user) throw new HttpException('User not found', 400);
    if (data.username) {
      const user = await this.prisma.user.findUnique({
        where: { username: data.username as string },
      });
      if (user) throw new HttpException('Username already exists', 400);
    }
    console.log(data);
    return this.prisma.user.update({ where: { id: id }, data: data });
  }

  async updateUserSettingsById(
    id: number,
    data: Prisma.UserSettingsUpdateInput,
  ) {
    const user = await this.getUserById(id);
    if (!user) throw new HttpException('User not found', 404);
    if (!user.userSettings) throw new HttpException('No settings found', 404);
    return this.prisma.userSettings.update({ where: { userId: id }, data });
  }

  async deleteUserById(id: number) {
    const user = await this.getUserById(id);
    if (!user) throw new HttpException('User not found', 400);
    return this.prisma.user.delete({ where: { id: id } });
  }
}
