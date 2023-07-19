import 'reflect-metadata';
import {
  ObjectType,
  registerEnumType,
  HideField,
  Field,
} from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class User extends BaseModel {
  @Field()
  @IsEmail()
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;
}
