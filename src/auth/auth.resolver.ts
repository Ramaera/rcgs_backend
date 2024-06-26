import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';
import { Token } from './models/token.model';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { User } from 'src/users/models/user.model';
import { PasswordRequestInput } from './dto/passwordRequest.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Auth)
  async signup(
    @Args('data')
    data: SignupInput,
  ) {
    const { accessToken, refreshToken } = await this.auth.createUser(data);
    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => Auth)
  async login(
    @Args('data')
    { email, password }: LoginInput,
  ) {
    return await this.auth.login(email, password);
  }

  @Mutation(() => Auth)
  async passwordresetRequest(
    @Args('data')
    { email }: PasswordRequestInput,
  ) {
    const { accessToken } = await this.auth.passwordresetRequest(email);
    return {
      accessToken,
    };
  }

  // @Mutation(() => EmptyModal)
  // async forgetPasswordWithPrivateKey(
  //   @Args('data') payload: ChangePasswordWithPrivateKeyInput,
  // ) {
  //   return this.auth.forgetPasswordWithPrivateKey(payload);
  // }

  @Mutation(() => Token)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.auth.refreshToken(token);
  }

  @ResolveField('user', () => User)
  async user(@Parent() auth: Auth) {
    return await this.auth.getUserFromToken(auth.accessToken);
  }
}
