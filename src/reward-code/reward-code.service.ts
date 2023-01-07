import { Injectable, UseGuards } from '@nestjs/common';
// import { CreateRewardCodeInput } from './dto/create-reward-code.input';
import { PrismaService } from 'nestjs-prisma';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Batch } from 'src/batch/models/batch.models';
import { GenerateRewardCodeInput, GetRewardCodeInput } from './dto/create-reward-code.input';
const ShortUniqueId = require('shortid');
// const uid = new ShortUniqueId();


// function randomString(NumberOfrewardCode) {
//   function genrateRandomString(){
//   let charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//   var randomString = '';
//   for (var i = 0; i < 10; i++) {
//       var randomPoz = Math.floor(Math.random() * charSet.length);
//       randomString += charSet.substring(randomPoz,randomPoz+1);
      
//   }
//   return randomString
// }

@Injectable()
export class RewardCodeService {
    constructor (
      private readonly prisma:PrismaService,
    ){}



// ****************************************************************************************
// ****************************************************************************************
// ******************************Generate Reward Code and Create Batch**********************
// *****************************************************************************************


      async GenerateRewardCode(payload:GenerateRewardCodeInput){
        const codes =[]
      
        let batch=await this.prisma.bATCH.findUnique({where:{batchCode:payload.batchId}})
       if (!batch){
          batch = await this.prisma.bATCH.create({data:{batchCode:payload.batchId}})
       }
        try {
          for (let i=0;i<payload.NumberOfrewardCode;i++){
            const reward_code=ShortUniqueId.generate()
            codes.push(reward_code)
          await this.prisma.rewardCode.create({
            data:{
              code:reward_code,
              batchCodeId:batch.id
            }
          })
        }
        }catch (e){
        }

        return codes

      

      }

      async getRewardCodes(payload:GetRewardCodeInput){
     
        if(payload.batchId){
          return await this.prisma.rewardCode.findMany({where:{batchCodeId:payload.batchId}})

        }else{
          return await this.prisma.rewardCode.findMany()

        }

      

      }


    
    }