import { InputType, Field, registerEnumType } from '@nestjs/graphql';

// ***************************************************************
// *******************Update User Details Input*******************
// ***************************************************************

@InputType()
export class UpdateKycHandlerInput {
  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  handlerId?: string;
}
