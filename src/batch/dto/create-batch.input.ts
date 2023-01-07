import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateBatchInput {
  @Field({ description: 'Batch Code Field Place Holder' })
  @IsNotEmpty()
  batchCode: string;


  
  

}


