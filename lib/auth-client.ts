import { createAuthClient } from "better-auth/client"

// In the browser, use the current origin so it works on any deployment URL.
// On the server (SSR), fall back to the explicit app URL.
const baseURL =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export const authClient = createAuthClient({ baseURL })

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient
