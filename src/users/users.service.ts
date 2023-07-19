import { PrismaService } from 'nestjs-prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  // ************************* Update User Details *****************

  async updateUser(userId: string, newUserData: UpdateUserInput) {
    const updated_user = this.prisma.uSER.update({
      data: newUserData,
      where: {
        id: userId,
      },
    });

    return updated_user;
  }

  // *****************************************************
  async getUser(userId: string) {
    const user = await this.prisma.uSER.findFirst({
      where: { id: userId },
    });

    return user;
  }

  // ##########get All User

  async getAllUser() {
    const allUser = this.prisma.uSER.findMany({});
    return allUser;
  }

  // #################################### Change Password ###########################################

  async changePassword(user, changePasswordValue: ChangePasswordInput) {
    const hashedPassword = await this.passwordService.hashPassword(
      changePasswordValue.newPassword,
    );

    const passwordValid = await this.passwordService.validatePassword(
      changePasswordValue.oldpassword,
      user.password,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }
    try {
      const updated_password = this.prisma.uSER.update({
        data: {
          password: hashedPassword,
        },
        where: {
          id: user.id,
        },
      });
      return updated_password;
    } catch (e) {}
  }

  // **************************
  async DeleteUser(user) {
    try {
      const getUser = await this.getUser(user.id);
      // console.log(typeof getUser);
      // var blob = new Blob(['Hello, world!'], {
      //   type: 'text/csv;charset=utf-8',
      // });
      // var FileSaver = require('file-saver');
      // console.log('---->>>', blob);
      // FileSaver.saveAs(blob, 'hello_world.txt');

      return getUser;
    } catch (err) {
      console.log(err);
    }
  }
}
