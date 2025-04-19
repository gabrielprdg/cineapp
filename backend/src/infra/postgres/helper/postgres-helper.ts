require('dotenv').config();
const { Pool } = require('pg');

export const pgHelper = {
  client: null as any,
  pool: null as any,
  async connect(): Promise<void> {
    this.pool = new Pool({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT
    })
    this.client = await this.pool.connect()
  }
}