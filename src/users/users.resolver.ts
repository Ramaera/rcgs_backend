import { PrismaService } from 'nestjs-prisma';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from '../common/decorators/user.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
  ) {}

  // *********************************Details about the User ********************

  @Query(() => User)
  async me(@UserEntity() user: User): Promise<User> {
    const _user = await this.usersService.getUser(user.id);
    return _user;
  }

  @Query(() => [User])
  async getAllUser() {
    const _user = await this.usersService.getAllUser();

    return _user;
  }

  // *********************************Updated  User details********************

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput,
  ) {
    return this.usersService.updateUser(user.id, newUserData);
  }

  // ****************** Remove a User ***************
  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async DeleteUser(
    @UserEntity() user: User,
    // @Args('data') data: UpdateUserInput
  ) {
    return this.usersService.DeleteUser(user.id);
  }

  // *********************************Mutation command  about the Changed Password   ********************

  @Mutation(() => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('data')
    data: ChangePasswordInput,
  ) {
    return this.usersService.changePassword(user, data);
  }
}
