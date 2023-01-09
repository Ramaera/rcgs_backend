import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { RewardCodeService } from './reward-code.service';
import { RewardCode, RewardCodes } from './entities/reward-code.entity';
import { GenerateRewardCodeInput, GetRewardCodeInput } from './dto/create-reward-code.input';
// import { UpdateRewardCodeInput } from './dto/update-reward-code.input';
import { PrismaService } from 'nestjs-prisma';
import { BatchEntity } from 'src/common/decorators/batch.decorators';
import { Batch } from 'src/batch/models/batch.models';
import { Req, UseFilters, UseGuards ,Request,Header} from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
// import { text } from 'stream/consumers';
import { GraphQLResolveInfo } from 'graphql';
const jwt = require('jsonwebtoken');





@Resolver(() => RewardCode)
export class RewardCodeResolver {
  constructor(
    private readonly rewardCodeService: RewardCodeService,
    private prisma: PrismaService
    ) {}
    
    
    @UseGuards(GqlAuthGuard)
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
      // const decodedHeader = Buffer.from(header, 'base64').toString();
      const decoded = jwt.verify(token,secret);
      if (decoded.username===process.env.username){
      const codes =  await this.rewardCodeService.GenerateRewardCode(data)
      return {codes}
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
      data:GetRewardCodeInput
    )
    {
      try {
      const token= context.req.headers.authorization;
      const secret = process.env.JWT_ACCESS_SECRET
      // const [header, payload, signature] = token.split('.');
      // const decodedHeader = Buffer.from(header, 'base64').toString();
      const decoded = jwt.verify(token,secret);
      if (decoded.username===process.env.username){
        const codes =  await this.rewardCodeService.getRewardCodes(data)
        return {codes}
      }
    }
      catch(err){
       if (err instanceof jwt.JsonWebTokenError ){
        throw new Error('Credentials are not Valid or Unauthorized Access')
       }
      //  else {
      //   throw new Error(err)
      //  }
      }
      // const codes =  await this.rewardCodeService.getRewardCodes(data)
      // return {codes}
    }
}