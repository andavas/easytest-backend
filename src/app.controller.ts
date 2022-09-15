import { Controller, Request, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service'

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('api/auth/login')
  async login(@Request() req) {
    
    return this.authService.login(req.body);
  }
}