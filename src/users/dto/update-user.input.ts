import { InputType, Field, registerEnumType } from '@nestjs/graphql';

// ***************************************************************
// *******************Update User Details Input*******************
// ***************************************************************

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  name?: string;
}
