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
}
