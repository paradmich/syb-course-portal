import { betterAuth } from "better-auth"
import Database from "better-sqlite3"
import path from "path"

/**
 * Better Auth — server instance
 *
 * Local dev:  SQLite file (db.sqlite in project root)
 * Production: swap `database` for a Postgres pool:
 *
 *   import { Pool } from "pg"
 *   database: new Pool({ connectionString: process.env.DATABASE_URL })
 *
 * Then re-run: npx @better-auth/cli generate
 */

// On Vercel, the app root is read-only at runtime; use /tmp instead.
// Locally, keep the db next to the project root so it persists across restarts.
const dbPath = process.env.VERCEL
  ? path.join("/tmp", "db.sqlite")
  : path.join(process.cwd(), "db.sqlite")

export const auth = betterAuth({
  database: new Database(dbPath),

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
  },

  socialProviders: {
    google: {
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  session: {
    expiresIn:          60 * 60 * 24 * 7,   // 7 days
    updateAge:          60 * 60 * 24,        // refresh if > 1 day old
    cookieCache: {
      enabled: true,
      maxAge:  60 * 5,                       // re-validate every 5 min
    },
  },

  user: {
    additionalFields: {
      // Track which courses the user has purchased
      purchasedCourses: {
        type:         "string",
        defaultValue: "[]",    // JSON array of course slugs
        input:        false,
      },
    },
  },
})

export type Session = typeof auth.$Infer.Session
export type User    = typeof auth.$Infer.Session.user
