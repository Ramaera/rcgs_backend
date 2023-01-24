import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GetBatchsearchInput {

@Field(()=>String)
name:string

}