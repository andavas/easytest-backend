import { Controller, Request, Post, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth/auth.service'

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('api/auth/login')
  async login(@Request() req, @Res() res) {
    
    const response = this.authService.login(req.body);
    if ((await response).access_token != undefined) 
      return res.status(HttpStatus.OK)
      .send(JSON.stringify(await response))

    else if ((await response).msg != undefined) 
      return res.status(HttpStatus.BAD_REQUEST)
      .send(JSON.stringify(await response))
  }
}