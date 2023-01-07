import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RewardCodeService } from './reward-code.service';
import { RewardCode, RewardCodes } from './entities/reward-code.entity';
import { GenerateRewardCodeInput, GetRewardCodeInput } from './dto/create-reward-code.input';
// import { UpdateRewardCodeInput } from './dto/update-reward-code.input';
import { PrismaService } from 'nestjs-prisma';
import { BatchEntity } from 'src/common/decorators/batch.decorators';
import { Batch } from 'src/batch/models/batch.models';
import { Req, UseFilters, UseGuards ,Request,Header} from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { text } from 'stream/consumers';
import { GraphQLResolveInfo } from 'graphql';





@Resolver(() => RewardCode)
export class RewardCodeResolver {
  constructor(
    private readonly rewardCodeService: RewardCodeService,
    private prisma: PrismaService
    ) {}
    

    @UseGuards(GqlAuthGuard)
    @Mutation(()=>RewardCode)
    async GenerateRewardCode(
      @Args('data')
      // @Header('authorization',null) 
      accessToken: string, info: GraphQLResolveInfo,
      data:GenerateRewardCodeInput,
    )
    {

      //  const token  = request.headers['authorization'].substring(7, request.headers['authorization'].length);
      // console.log({header})
      const codes =  await this.rewardCodeService.GenerateRewardCode(data)
      return {codes}
      // return {}
    }

    @Query(()=>RewardCodes)
    async GetRewardCode1(
   
      @Args('data')
      data:GetRewardCodeInput
    )
    {
      const codes =  await this.rewardCodeService.getRewardCodes(data)
      return {codes}
    }




}