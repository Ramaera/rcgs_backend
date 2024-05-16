import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BatchService } from './batch.service';
import { BatchEntity } from './entities/batch.entity';
import { CreateBatchInput } from './dto/create-batch.input';
import { PrismaService } from 'nestjs-prisma';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { RewardCode } from 'src/reward-code/entities/reward-code.entity';
import { MessageEntity } from './entities/sucessMessage.entity';

@Resolver(() => BatchEntity)
export class BatchResolver {
  constructor(private readonly batchService: BatchService) {}

  @Query(() => [BatchEntity])
  async getBatchDetails(
    @Args({ name: 'take', type: () => Int, defaultValue: 100 }) take: number,
    @Args({ name: 'skip', type: () => Int, defaultValue: 0 }) skip: number,
  ) {
    const data = await this.batchService.getBatchDetails({ take, skip });

    return data;
  }

  @Mutation(() => MessageEntity)
  async applyProductOnBatch(
    @Args({ name: 'batchCode', type: () => Int, defaultValue: 100 })
    batchCode: number,
    @Args({ name: 'ProductId', type: () => String, defaultValue: 0 })
    ProductId: string,
  ) {
    const dataApplied = await this.batchService.applyBatchCodeonProduct(
      batchCode,
      ProductId,
    );
    return dataApplied;
  }
}
