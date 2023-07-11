import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { RewardCodeService } from './reward-code.service';
import { RewardCode, RewardCodes } from './entities/reward-code.entity';
import {
  GenerateRewardCodeInput,
  GetRewardCodeInput,
} from './dto/create-reward-code.input';
import { PrismaService } from 'nestjs-prisma';
const jwt = require('jsonwebtoken');
@Resolver(() => RewardCode)
export class RewardCodeResolver {
  constructor(
    private readonly rewardCodeService: RewardCodeService,
    private prisma: PrismaService,
  ) {}

  @Mutation(() => RewardCode)
  async GenerateRewardCode(
    @Args('data')
    data: GenerateRewardCodeInput,
  ) {
    try {
      const codes = await this.rewardCodeService.GenerateRewardCode(data);
      return {
        codes,
      };
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        throw new Error('Credentials are not Valid or Unauthorized Access');
      }
    }
  }

  // @Query(() => [RewardCode])
  // async getAllcode() {
  //   const allrewardcode = await this.rewardCodeService.getAllCode();
  //   return allrewardcode;
  // }
}
