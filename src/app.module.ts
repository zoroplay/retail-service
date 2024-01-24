import { Module } from '@nestjs/common';
import { RetailModule } from './retail/retail.module';

@Module({
  imports: [RetailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
