import { Injectable } from '@nestjs/common';
import { isInstance } from 'class-validator';
import { PrismaService } from 'nestjs-prisma';
import { GetRewardsearchInput } from './dto/Reward-code.input';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(payload: CreateProductInput) {
    try {
      let product = await this.prisma.product.findUnique({
        where: { name: payload.name },
      });
      if (product) {
        throw new Error(`Product name already exist.`);
      }
      if (!product) {
        product = await this.prisma.product.create({
          data: { name: payload.name },
        });
      }
      return product;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  // async updateProduct(payload: CreateProductInput) {
  //   return await this.prisma.product.update({
  //     where: { id: payload.id },
  //     payload,
  //   });
  // }

  async deleteProduct(id: string) {
    return await this.prisma.product.delete({ where: { id } });
  }

  // async getProduct(id: string) {
  //   return await this.prisma.product.findOne({ where: { id } });
  // }

  async getRewardCodeDetails(payload: GetRewardsearchInput) {
    try {
      let product = await this.prisma.product.findUnique({
        where: { name: payload.name },
      });
      return await this.prisma.rewardCode.findMany({
        where: {
          productId: product.id,
        },
      });
    } catch (error) {
      if (error instanceof TypeError) {
        if (error.message === "Cannot read properties of null (reading 'id')") {
          throw new Error(`product dose not exist`);
        }
      }
    }
  }

  async getAllProducts() {
    try {
      return await this.prisma.product.findMany();
    } catch (error) {
      throw error('check the error');
    }
  }
}
