import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GetRewardsearchInput {
  @Field(() => String)
  name: string;
}
