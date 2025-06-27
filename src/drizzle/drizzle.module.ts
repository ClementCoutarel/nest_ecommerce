import { Module } from '@nestjs/common';
import { DrizzleAsyncProvider, drizzleProvider } from './drizzle.provider';
import {  ConfigService } from '@nestjs/config';

@Module({
    imports:[],
    providers: [ConfigService,...drizzleProvider],
    exports: [DrizzleAsyncProvider]
})
export class DrizzleModule {}
