import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BatchService } from './batch.service';
import { Batch } from './entities/batch.entity';
import { CreateBatchInput } from './dto/create-batch.input';
import { PrismaService } from 'nestjs-prisma';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { RewardCode } from 'src/reward-code/entities/reward-code.entity';

@Resolver(() => Batch)
export class BatchResolver {
  constructor(
    private prisma:PrismaService
    ) {}

  //   @UseGuards(GqlAuthGuard)
  //   @Mutation(()=>Batch)
  //  async createBatchCode(
  //   @Args('data')
  //   data:CreateBatchInput
  //  ){
  //   const newBatchCode=this.prisma.bATCH.create({
  //     data:{
  //       batchCode:data.batchCode
  //     }
  //   })
  //   return newBatchCode
  //  }

  
 

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  
}

}
