import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class MessageEntity {
  @Field(() => String, { description: 'Message' })
  message: string;
}
