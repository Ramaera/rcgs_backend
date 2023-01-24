import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RewardCodeModule } from './reward-code/reward-code.module';
import { BatchModule } from './batch/batch.module';
// import { AuthModule } from './auth/auth.module';
import config from 'src/common/configs/config';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './gql-config.service';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        // middlewares: [loggingMiddleware(new Logger('PrismaMiddleware'))], // configure your prisma middleware
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // useClass: GqlConfigService,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    RewardCodeModule,
    AuthModule, 
    BatchModule, ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
