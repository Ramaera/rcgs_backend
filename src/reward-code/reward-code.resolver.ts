import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { RewardCodeService } from './reward-code.service';
import { RewardCode, RewardCodes } from './entities/reward-code.entity';
import {
  GenerateRewardCodeInput,
  GetRewardCodeInput,
} from './dto/create-reward-code.input';
import { PrismaService } from 'nestjs-prisma';
import { BatchEntity } from 'src/batch/entities/batch.entity';
import { messageBoolean } from './entities/messageBoolean';
const jwt = require('jsonwebtoken');
@Resolver(() => RewardCode)
export class RewardCodeResolver {
  constructor(
    private readonly rewardCodeService: RewardCodeService,
    private prisma: PrismaService,
  ) {}

  @Mutation(() => [RewardCode])
  async GenerateRewardCode(
    @Args('data')
    data: GenerateRewardCodeInput,
  ) {
    try {
      return await this.rewardCodeService.GenerateRewardCode(data);
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        throw new Error('Credentials are not Valid or Unauthorized Access');
      }
    }
  }

  @Query(() => messageBoolean)
  async CheckBatchHasProduct(
    @Args({ name: 'batchCode', type: () => Int })
    batchCode: number,
  ) {
    return await this.rewardCodeService.checkBatchHasProduct(batchCode);
  }

  @Query(() => [RewardCode])
  async getAllcode() {
    const allrewardcode = await this.rewardCodeService.getAllCode();
    return allrewardcode;
  }
}
