import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BatchService } from './batch.service';
import { BatchEntity } from './entities/batch.entity';
import { CreateBatchInput } from './dto/create-batch.input';
import { PrismaService } from 'nestjs-prisma';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { RewardCode } from 'src/reward-code/entities/reward-code.entity';

@Resolver(() => BatchEntity)
export class BatchResolver {
  constructor(private readonly batchService: BatchService) {}

  @Query(() => [BatchEntity])
  async getBatchDetails() {
    const data = await this.batchService.getBatchDetails();

    return data;
  }
}
