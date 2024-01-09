import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { UsersDocument } from './users/model/users.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UsersDocument, response: Response) {
    const payloadToken = { userId: user._id.toHexString() };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION_TIME'),
    );
    const token = this.jwtService.sign(payloadToken);
    response.cookie('Authentication', token, { httpOnly: true, expires });
  }
}
