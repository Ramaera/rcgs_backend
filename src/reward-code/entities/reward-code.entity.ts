import { ObjectType, Field, Int } from '@nestjs/graphql';
import { RewardModel } from '../models/reward.models';





@ObjectType()
export class RewardCode {
  @Field(() => [String], { description: 'Example field (placeholder)' })
  codes: [String] | [];

}

@ObjectType()
export class RewardCodes{
  @Field(()=>[RewardModel])
  codes?: RewardModel[]
}
