import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/loginInput';
import { Token } from './models/token.model'

@Resolver(() => Token)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Token)
  async login(
    @Args('data'){
      username,
      password
    }:LoginInput){
      const { accessToken,refreshToken}=await this.authService.login(
        username,
        password
      );
      return{
        accessToken,
        refreshToken
      }
    }
  }
