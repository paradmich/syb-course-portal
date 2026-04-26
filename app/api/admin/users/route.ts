import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getPool } from "@/lib/db"
import { headers } from "next/headers"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "michele.parad@gmail.com"

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
    return null
  }
  return session
}

// GET /api/admin/users?email=...
export async function GET(req: NextRequest) {
  if (!await requireAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const email = req.nextUrl.searchParams.get("email")?.trim()
  if (!email) return NextResponse.json({ error: "email required" }, { status: 400 })

  const pool = getPool()
  const { rows } = await pool.query(
    `SELECT id, name, email, "purchasedCourses" FROM "user" WHERE lower(email) = lower($1)`,
    [email]
  )

  if (rows.length === 0) return NextResponse.json({ user: null })

  const user = rows[0]
  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      purchasedCourses: JSON.parse(user.purchasedCourses || "[]"),
    },
  })
}
