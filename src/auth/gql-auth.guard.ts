import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Context, GqlExecutionContext } from '@nestjs/graphql';
const jwt = require('jsonwebtoken');

@Injectable()
export class GqlAuthGuard 
// extends AuthGuard('jwt')
 {

  async verifyCode(
    @Context() 
    context,
  ){
  try {
    const token= context.req.headers.authorization;
    const secret = process.env.JWT_ACCESS_SECRET

    const [header, payload, signature] = token.split('.');
    // Decode the header
    const decodedHeader = Buffer.from(header, 'base64').toString();

    const decoded = jwt.verify(token,secret);
    console.log(decoded)


    if (!decoded){
      
      
    }

    // console.log(decoded.name);  // John Doe
    // console.log(decoded.sub);  // 1234567890
    }
    catch(error){
      throw new Error(error)
    }
    // const codes =  await this.rewardCodeService.getRewardCodes(data)
    // return {codes}
  }
}
  
  // getRequest(context: ExecutionContext) {
  //   const ctx = GqlExecutionContext.create(context);



  //   const out=ctx.getContext().req
  //   console.log(out)
  //   return ctx.getContext().req;

  // }
// }
