import { redirect } from 'next/navigation'

// This is a course portal — the catalog is the home experience.
export default function HomePage() {
  redirect('/courses')
}
