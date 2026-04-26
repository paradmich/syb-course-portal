import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getPool } from "@/lib/db"
import { headers } from "next/headers"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "michele.parad@gmail.com"

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) return null
  return session
}

// POST /api/admin/grant  { userId, courseSlug, grant: true|false }
export async function POST(req: NextRequest) {
  if (!await requireAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { userId, courseSlug, grant } = await req.json()
  if (!userId || !courseSlug) {
    return NextResponse.json({ error: "userId and courseSlug required" }, { status: 400 })
  }

  const pool = getPool()

  // Fetch current courses
  const { rows } = await pool.query(
    `SELECT "purchasedCourses" FROM "user" WHERE id = $1`,
    [userId]
  )
  if (rows.length === 0) return NextResponse.json({ error: "User not found" }, { status: 404 })

  const current: string[] = JSON.parse(rows[0].purchasedCourses || "[]")

  let updated: string[]
  if (grant) {
    updated = current.includes(courseSlug) ? current : [...current, courseSlug]
  } else {
    updated = current.filter((s: string) => s !== courseSlug)
  }

  await pool.query(
    `UPDATE "user" SET "purchasedCourses" = $1 WHERE id = $2`,
    [JSON.stringify(updated), userId]
  )

  return NextResponse.json({ success: true, purchasedCourses: updated })
}
