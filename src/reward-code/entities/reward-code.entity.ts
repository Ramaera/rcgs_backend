import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Batch } from 'src/batch/models/batch.models';
import { Product } from 'src/products/entities/product.entity';
import { RewardModel } from '../models/reward.models';


@ObjectType()
export class RewardCode {
  
  @Field(() => Date,{nullable:true})
  createdAt!: Date;

  @Field(() => Date,{nullable:true})
  updatedAt!: Date;

  @Field(()=>[Batch],{nullable:true})
  batch?:Batch[]|null

  @Field(()=>Product,{nullable:true})
  name:Product

  @Field(()=>[RewardModel],{nullable:true})
  all_codes?: RewardModel[]| []

  @Field(() => [String],{nullable:true})
  codes: [String]| [];

}



@ObjectType()
export class RewardCodes{
    
  @Field(() => Date,{nullable:true})
  createdAt!: Date;

  @Field(() => Date,{nullable:true})
  updatedAt!: Date;

  @Field(()=>[Batch],{nullable:true})
  batch?:Batch[]|null

  @Field(()=>[RewardModel],{nullable:true})
  codes?: RewardModel[]
}
