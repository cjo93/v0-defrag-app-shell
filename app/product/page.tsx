import { redirect } from 'next/navigation'

export default function ProductRedirectPage() {
  // Redirect /product to the public demo so the route does not 404
  redirect('/demo')
}

