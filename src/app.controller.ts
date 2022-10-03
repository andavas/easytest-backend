import { Controller, Request, Post, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth/auth.service'

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('api/auth/login')
  async login(@Request() req, @Res() res) {
    
    const response = await this.authService.login(req.body);
    console.log(response)
    if (response.hasOwnProperty("access_token")) {
      return res.status(HttpStatus.OK)
      .send(JSON.stringify(await response))
    }

    else if (response.hasOwnProperty("msg")) 
      return res.status(HttpStatus.BAD_REQUEST)
      .send(JSON.stringify(await response))

      
  }
}