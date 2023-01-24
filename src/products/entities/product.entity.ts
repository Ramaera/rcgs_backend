import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Batch } from 'src/batch/models/batch.models';

@ObjectType()
export class Product {
@Field (()=> String,{nullable:true})
  id!:string

  @Field(() => Date,{nullable:true})
  createdAt!: Date;

  @Field(() => Date,{nullable:true})
  updatedAt!: Date;

  @Field(()=> String,{nullable:true})
  name:string;

  @Field(()=> String,{nullable:true})
  batchCode:string;


  // @Field(()=>[Batch],{nullable:true})
  // batch:Batch[]
  

}


