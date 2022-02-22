import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('AppService') private readonly app: string) {}
  getHello(): string {
    return 'Hello World!';
  }

  getFoo() {
    return this.app;
  }
}
