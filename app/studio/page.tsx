import { redirect } from 'next/navigation'

// /studio redirects to the landing page on this branch.
// The workspace is accessible after sign-in.
export default function StudioPage() {
  redirect('/')
}