import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from "./schema"

@Injectable()
export class DrizzleService {
    private pool : Pool
    public db: NodePgDatabase<typeof schema>

    constructor(private configService: ConfigService){
         const connectionString = configService.get<string>('DATABASE_URL')
        
        if(!connectionString) {
            throw new Error("DATABASE_URL not provided" )
        } 

        this.pool = new Pool({
            connectionString,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000
        })

        this.db = drizzle(this.pool, {schema})
    }
}
