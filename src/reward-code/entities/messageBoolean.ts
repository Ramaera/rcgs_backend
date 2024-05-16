import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Batch } from 'src/batch/models/batch.models';
import { Product } from 'src/products/entities/product.entity';
import { RewardModel } from '../models/reward.models';

@ObjectType()
export class messageBoolean {
  @Field(() => Boolean, { nullable: true })
  message: boolean;
}
