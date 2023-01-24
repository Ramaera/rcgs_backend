import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { RewardCodeService } from './reward-code.service';
import { RewardCode, RewardCodes } from './entities/reward-code.entity';
import { GenerateRewardCodeInput, GetRewardCodeInput } from './dto/create-reward-code.input';
import { PrismaService } from 'nestjs-prisma';
const jwt = require('jsonwebtoken');
@Resolver(() => RewardCode)
export class RewardCodeResolver {
  constructor(
    private readonly rewardCodeService: RewardCodeService,
    private prisma: PrismaService
    ) {}

    @Mutation(()=>RewardCode)
    async GenerateRewardCode(
      @Context() 
      context,
      @Args('data')
      data:GenerateRewardCodeInput,
    )
    {
      try {
      const token= context.req.headers.authorization;
      const secret = process.env.JWT_ACCESS_SECRET
      const [header, payload, signature] = token.split('.');
      const decoded = jwt.verify(token,secret);
      if (decoded.username===process.env.username){
      const codes=await this.rewardCodeService.GenerateRewardCode(data)
      const all_codes =  await this.rewardCodeService.getReward(data)
       return {
        codes,
        all_codes
      }
      }
    }
    catch(err){
      if (err instanceof jwt.JsonWebTokenError ){
       throw new Error('Credentials are not Valid or Unauthorized Access')
      }
  }
}
    @Query(()=>RewardCodes)
    async GetRewardCode1(
      @Context() 
      context,
      @Args('data')
      getdata:GetRewardCodeInput)
    {
      const token= context.req.headers.authorization;
      try {
      const secret = process.env.JWT_ACCESS_SECRET 
      const decoded = jwt.verify(token,secret);
      if (decoded.username===process.env.username){
        const codes =  await this.rewardCodeService.getReward(getdata)
        return {codes}
      }
    }
      catch(err){
       if (err instanceof jwt.JsonWebTokenError ){
        throw new Error('credentials are not Valid or Unauthorized Access')
       }
       
      }
    }
}