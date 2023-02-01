import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Context, GqlExecutionContext } from '@nestjs/graphql';
const jwt = require('jsonwebtoken');

@Injectable()
export class GqlAuthGuard 
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


    }
    catch(error){
      throw new Error(error)
    }

  }
}
  
