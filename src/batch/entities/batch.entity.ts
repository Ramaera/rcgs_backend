import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BatchEntity {
  @Field(() => String, { description: 'Example field (placeholder)' })
  batchCode: String;
}
