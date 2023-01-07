import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Headers, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtDto } from './dto/jwt.dto';
import { Batch } from 'src/batch/models/batch.models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
      passReqToCallback:true
    });
  }
   async validate(req: Request){
    
    console.log("hhhhiii",req)
    // const token  = req.headers['authorization'].substring(7, req.headers['authorization'].length);
    // console.log({token})

    // const resp = await this.authService.verify(token);
    // console.log(resp)

    // if (!batch) {
      // throw new UnauthorizedException();
      throw new Error("Errrrr")
    // }
    // return batch;
  }
}
