import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { BatchEntity } from 'src/batch/entities/batch.entity';
import { GetRewardsearchInput } from './dto/Reward-code.input';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { ProductService } from './products.service';
const jwt = require('jsonwebtoken');
@Resolver('Product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('data')
    data: CreateProductInput,
  ) {
    return await this.productService.createProduct(data);
  }

  // @Mutation()
  // async updateProduct(@Args('data') data: any) {
  //   return await this.productService.updateProduct(data);
  // }

  // @Mutation()
  // async deleteProduct(@Args('id') id: string) {
  //   return await this.productService.deleteProduct(id);
  // }

  // @Query()
  // async product(@Args('id') id: string) {
  //   return await this.productService.getProduct(id);
  // }

  @Query(() => [Product])
  async products() {
    return await this.productService.getAllProducts();
  }

  @Query(() => [Product])
  async getRewardCode(
    @Context()
    context,
    @Args('data')
    data: GetRewardsearchInput,
  ) {
    try {
      const token = context.req.headers.authorization;
      const secret = process.env.JWT_ACCESS_SECRET;
      const [header, payload, signature] = token.split('.');
      const decoded = jwt.verify(token, secret);
      if (decoded.username === process.env.username) {
        return await this.productService.getRewardCodeDetails(data);
      }
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        throw new Error('Credentials are not Valid or Unauthorized Access');
      }
    }
  }
}
