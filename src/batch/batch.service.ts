import { Injectable } from '@nestjs/common';
import { CreateBatchInput } from './dto/create-batch.input';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BatchService {
  constructor (
private readonly prisma:PrismaService,
  ){}
  
}
