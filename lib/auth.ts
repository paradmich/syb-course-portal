import { betterAuth } from "better-auth"
import { Pool } from "pg"

const appUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000"

export const auth = betterAuth({
  baseURL: appUrl,
  trustedOrigins: [appUrl],

  database: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes("supabase")
      ? { rejectUnauthorized: false }
      : false,
  }),

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
    expiresIn:          60 * 60 * 24 * 7,
    updateAge:          60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge:  60 * 5,
    },
  },

  user: {
    additionalFields: {
      purchasedCourses: {
        type:         "string",
        defaultValue: "[]",
        input:        false,
      },
    },
  },
})

export type Session = typeof auth.$Infer.Session
export type User    = typeof auth.$Infer.Session.user
