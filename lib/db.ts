import { Pool } from "pg"

// Shared Postgres pool — reused across admin routes and auth
let _pool: Pool | null = null

export function getPool(): Pool {
  if (!_pool) {
    _pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL?.includes("supabase")
        ? { rejectUnauthorized: false }
        : false,
    })
  }
  return _pool
}
