import { Injectable } from '@nestjs/common';
import { CreateBatchInput } from './dto/create-batch.input';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BatchService {
  constructor(private readonly prisma: PrismaService) {}

  async getBatchDetails({ take, skip }) {
    const batchDetails = await this.prisma.bATCH.findMany({
      take,
      skip,
      orderBy: {
        batchCode: 'asc',
      },
    });
    return batchDetails;
  }

  async applyBatchCodeonProduct(batchCode, productId) {
    const allRewardCodes = await this.prisma.rewardCode.findMany({
      where: {
        batchCodeId: batchCode,
      },
    });
    allRewardCodes.map(
      async (codeData) =>
        await this.prisma.rewardCode.update({
          where: {
            id: codeData?.id,
          },
          data: {
            productId,
          },
        }),
    );

    return { message: 'Code Applied Successfully' };
  }
}
