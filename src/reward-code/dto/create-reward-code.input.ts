import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GenerateRewardCodeInput {

@Field(()=>Int)
NumberOfrewardCode:number


@Field(()=>String)
batchId:string
}



@InputType()
export class GetRewardCodeInput {



@Field(()=>String,{nullable:true})
batchId?:string

}
