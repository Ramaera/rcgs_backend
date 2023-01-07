import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Batch {
  @Field(() => String, { description: 'Example field (placeholder)' })
  batchCode: String;
}
