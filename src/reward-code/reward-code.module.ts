import { Module } from '@nestjs/common';
import { RewardCodeService } from './reward-code.service';
import { RewardCodeResolver } from './reward-code.resolver';

@Module({
  providers: [RewardCodeResolver, RewardCodeService]
})
export class RewardCodeModule {}
