import type { NextApiRequest, NextApiResponse } from 'next'

interface ProNotifyResponse {
  ok?: boolean
  error?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProNotifyResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : ''
  const source = typeof req.body?.source === 'string' ? req.body.source.trim().slice(0, 80) : 'unknown'

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'Valid email required' })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'Supabase not configured' })
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/pro_waitlist?on_conflict=email`, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify({
        email,
        source,
        product: 'tickk',
        created_at: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      const message = await response.text()
      console.error('Supabase Pro waitlist insert failed:', message)
      return res.status(500).json({ error: 'Failed to save email' })
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Pro notify error:', error)
    return res.status(500).json({ error: 'Failed to save email' })
  }
}
