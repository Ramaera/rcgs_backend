import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RewardModel {
  @Field(() => String)
  id: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;

  @Field(()=>String)
  code:String

  @Field(()=>String,{nullable:true})
  batchId:String
}
