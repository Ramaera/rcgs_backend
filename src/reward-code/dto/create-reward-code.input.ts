import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GenerateRewardCodeInput {
  @Field(() => Int)
  NumberOfSheetsRequired: number;

  // @Field(()=>String)
  // batchId:string

  // @Field(()=>String)
  // name:string
}

@InputType()
export class GetRewardCodeInput {
  @Field(() => String, { nullable: true })
  batchId?: string;

  @Field(() => String)
  name: string;
}
