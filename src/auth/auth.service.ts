import { PrismaService } from 'nestjs-prisma';
import { Prisma, USER } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { SignupInput } from './dto/signup.input';
import { Token } from './models/token.model';
import { SecurityConfig } from '../common/configs/config.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(payload: SignupInput): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password,
    );

    try {
      const user = await this.prisma.uSER.create({
        data: {
          email: payload.email,
          password: hashedPassword,
        },
      });
      return this.generateTokens({
        userId: user.id,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        let problemField = e.meta.target[0];

        throw new ConflictException(`${problemField} already used.`);
      }
      throw new Error(e);
    }
  }

  async passwordresetRequest(email: string): Promise<Token> {
    const user = await this.prisma.uSER.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for PW_Id: ${email}`);
    }
    return this.generateTokens({
      userId: user.id,
    });
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.prisma.uSER.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`No user found for PW_Id: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens({
      userId: user.id,
    });
  }

  validateUser(userId: string): Promise<USER> {
    return this.prisma.uSER.findUnique({ where: { id: userId } });
  }

  getUserFromToken(token: string): Promise<USER> {
    const id = this.jwtService.decode(token)['userId'];
    return this.prisma.uSER.findUnique({
      where: { id },
    });
  }

  generateTokens(payload: { userId: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: string }): string {
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

      return this.generateTokens({
        userId,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
