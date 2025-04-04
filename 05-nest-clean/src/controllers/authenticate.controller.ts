import { Controller, HttpCode, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('/sessions')
export class AuthenticateController {
  constructor(private jwt: JwtService) {}

  @Post()
  @HttpCode(201)
  handle() {
    const token = this.jwt.sign({
      sub: 'userId',
    });

    return {
      token,
    };
  }
}
