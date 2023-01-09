import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Headers, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtDto } from './dto/jwt.dto';
import { Batch } from 'src/batch/models/batch.models';
import { Auth } from './models/auth.models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService

  )
   {
    var cookieExtractor = function(req) {
      var token = null;
      if (req && req.cookies)
      {
          token = req.cookies['jwt'];
      }
      return token;
  };
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
    
  }
  // getUserFromToken(token: string): Promise<User> {
  //   const id = this.jwtService.decode(token)['userId'];
  //   return this.prisma.user.findUnique({ where: { id } });
  // }
  
  // async validate(payload: JwtDto){
  //   const user = await this.authService.validateUser(payload.userId);
    
  //   // return user;
  // }
}
