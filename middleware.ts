import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Routes that require authentication
const PROTECTED = ["/dashboard", "/learn"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED.some(path => pathname.startsWith(path))
  if (!isProtected) return NextResponse.next()

  // Better Auth stores session token in "better-auth.session_token" cookie
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token")

  if (!sessionCookie?.value) {
    // PREVIEW_MODE: skip redirect so screenshots work without a session
    if (process.env.PREVIEW_MODE !== "1") {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/learn/:path*"],
}
