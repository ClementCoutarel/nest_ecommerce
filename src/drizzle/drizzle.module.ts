import { Module } from '@nestjs/common';
import {  ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema'
import { Pool } from 'pg';
import { DrizzleService } from './drizzle.service';


const DATABASE_CONNECTION = 'DATABASE_CONNECTION'
@Module({
    imports:[ConfigModule],
    providers: [{
        provide: DATABASE_CONNECTION,
        inject: [ConfigService],
        useFactory: (configService: ConfigService)=>{
            const connectionString = configService.get<string>('DATABASE_URL')

            if(!connectionString) {
                throw new Error("DATABASE_URL not provided" )
            } 

            const pool = new Pool({
                connectionString,
                max: 20,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 2000
            })

            return drizzle(pool, {schema})
        }
    }, DrizzleService],
    exports: [DrizzleService]
})
export class DrizzleModule {}
