import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Batch{
  @Field(() => String)
  id: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;

  @Field(() => String)
  batchCode: string;




  // @Field(()=>String)
  // batchCodeId:string;

 
}
