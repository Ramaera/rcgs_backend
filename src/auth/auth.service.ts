import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { Batch } from 'src/batch/models/batch.models';
import { SecurityConfig } from 'src/common/configs/config.interface';
import { RewardCode } from 'src/reward-code/entities/reward-code.entity';
import { Token } from './models/token.model';

@Injectable()
export class AuthService {
constructor(
  private readonly jwtService:JwtService,
  private readonly prisma: PrismaService,
  private readonly configService: ConfigService
){}
   

async login(name:string,password:string):Promise<Token>{
  if (name!== process.env.username ){
    throw new NotFoundException("Username Not found")
  }
  if( password!== process.env.user_password){
    throw new BadRequestException('Invalid Passowrd')
  }
  return this.generateTokens({
    userId:process.env.id,
    password:process.env.password,
    username:process.env.username


})
}


generateTokens(payload:{userId:string,username:string,password:string}):Token{
  return {
    accessToken: this.generateAccessToken(payload),
    refreshToken: this.generateRefreshToken(payload),
  }
}

private generateAccessToken(payload: { userId: string,username:string,password:string }): string {
  return this.jwtService.sign(payload);
}

private generateRefreshToken(payload: { userId: string,username:string,password:string}): string {
  const securityConfig = this.configService.get<SecurityConfig>('security');
  return this.jwtService.sign(payload, {
    secret: this.configService.get('JWT_REFRESH_SECRET'),
    expiresIn: securityConfig.refreshIn,
  });
}

refreshToken(token: string) {
  try {
    const { userId } = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });
    const { username } = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });
    const { password } = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });

    return this.generateTokens({
      userId,
      username,
      password
    });
  } catch (e) {
    throw new UnauthorizedException();
  }
}
validateBatch(batchCodeId: string): Promise<Batch> {
  return this.prisma.bATCH.findUnique({where:{batchCode:batchCodeId}})
}
}