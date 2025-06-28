import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    ConfigModule.forRoot({isGlobal:true}),
    OrdersModule,
    UsersModule,
    DatabaseModule,
    TypeOrmModule.forRoot({
      type : 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'local',
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
  }
}
