import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductResolver } from './products.resolver';

@Module({
  providers: [
    ProductResolver,
     ProductService
    ]
})
export class ProductsModule {}
