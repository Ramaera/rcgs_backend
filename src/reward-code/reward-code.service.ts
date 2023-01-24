import { Injectable, UseGuards } from '@nestjs/common';
import { isInstance } from 'class-validator';
// import { CreateRewardCodeInput } from './dto/create-reward-code.input';
import { PrismaService } from 'nestjs-prisma';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Batch } from 'src/batch/models/batch.models';
import {
  GenerateRewardCodeInput,
  GetRewardCodeInput,
} from './dto/create-reward-code.input';
const ShortUniqueId = require('shortid');
@Injectable()
export class RewardCodeService {
  constructor(private readonly prisma: PrismaService) {}

  // ****************************************************************************************
  // ****************************************************************************************
  // ******************************Generate Reward Code and Create Batch**********************
  // *****************************************************************************************

  async GenerateRewardCode(payload: GenerateRewardCodeInput) {
  
    const codes = [];
    console.log("a")
    try{
    var productExist = await this.prisma.product.findUnique({
      where: { name: payload.name },
    });
    var updatedBatchCode = `${productExist.name}/${payload.batchId}`;
    var batch = await this.prisma.bATCH.findUnique({
      where: { batchCode: updatedBatchCode },
    });

    if (!batch) {
      batch = await this.prisma.bATCH.create({
        data: {
          batchCode: updatedBatchCode,
          product: { connect: { id: productExist.id } },
        },
      });
    }
      for (let i = 0; i < payload.NumberOfrewardCode; i++) {
        const reward_code = ShortUniqueId.generate().toUpperCase();
        codes.push(reward_code);
        await this.prisma.rewardCode.create({
          data: {
            code: reward_code,
            batchCodeId: batch.id,
          },
        });
      }
    return codes;
  }catch(error){
    console.log(error)
    if (error instanceof TypeError) {
      if (error.message==="Cannot read properties of null (reading 'name')"){
        console.log('Product does not exist ')
        throw new Error(`product dose not exist`)
      }
      else{
        throw new Error("check")
      }
    }

  }
  }
  
  async getReward(payload: GetRewardCodeInput) {
    try{
      var productExist = await this.prisma.product.findUnique({
        where: { name: payload.name },
      });
      console.log(productExist)
      if (productExist) {
      var updatedBatchCode = payload.name.concat('/', payload.batchId);
      let codeId = await this.prisma.bATCH.findMany({
        where: { batchCode: updatedBatchCode },
      });
      let commonCodeId = codeId[0].id;
      return await this.prisma.rewardCode.findMany({
        where: { batchCodeId: commonCodeId },
      });
    }else {
      throw new Error(`${payload.name} does not exist`)
    }
    
  }catch(error){
    if (error instanceof TypeError) {
      if (error.message==="Cannot read properties of null (reading 'name')"){

        console.log(error.message)
        throw new Error(`product does not exist`)
      }
    }
  }
  }

  async getRewardCodes(payload: GetRewardCodeInput) {
    try {
      if (payload.batchId) {
        let codeId = await this.prisma.bATCH.findMany({
          where: { batchCode: payload.batchId },
        });
        let commonCodeId = codeId[0].id;
        return await this.prisma.rewardCode.findMany({
          where: { batchCodeId: commonCodeId },
        });
      }
    } catch (err) {
      if (err instanceof TypeError) {
        console.log('Object is undefined or null. Id cannot be accessed.');
      }
    }
  }
}
